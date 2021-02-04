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



  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the

  app.post('/api/notes', (req, res) => {
    // Note the code here. Our "server" will respond to requests and let users know the notes saved

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

  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.delete('/api/notes', (req, res) => {

    let deleteNote = req.params.id
    
  



    })








};