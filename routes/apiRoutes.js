// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.

const dbData = require('../db/db.json');
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');

// ROUTING

module.exports = (app) => {
  let addNotes = []

  //calls notes from db.json
  app.get('/api/notes', (req, res) => {

    // reads the information and repost data to saved content until deleted
    fs.readFile("./db/db.json", (err, data) => {
      if (err) throw (err);
      res.send(data);

    });
  });



  
  // Below code handles when a user submits note and thus submits data to the db

  app.post('/api/notes', (req, res) => {
   

    let addNewNote = {
      title: req.body.title,
      text: req.body.text,
      id: uniqid()



    };

    addNotes.push(addNewNote);
    res.json(addNewNote);

    fs.readFile('./db/db.json', (err, data) => {
      if (err) throw (err);
      addNotes = JSON.parse(data);
      addNotes.push(addNewNote);

      fs.writeFile('./db/db.json', JSON.stringify(addNotes), (err) => {
        if (err) throw (err);
        res.json(dbData)





      })

    })





  
  });

  // pulls in data to delete the selected note by user cycles through array to single out the note to be deleted and resends array back into db

  app.delete('/api/notes', (req, res) => {

    const deleteNote = req.params.id;

   for (let i = 0; i < addNotes.length; i++) {
     if (addNotes[i].id === deleteNote){
       addNotes.splice(i, 1);
     };
     
   };
   

   fs.writeFile('./db/db.json', JSON.stringify(addNotes), (err) =>{
     if (err) throw (err);








   });

   res.send((dbData));



    })








};