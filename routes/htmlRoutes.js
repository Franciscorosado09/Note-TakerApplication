// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
const dbData = require('../db/db.json');
const path = require('path');

// ROUTING

module.exports = (app) => {
  // => HTML GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases the user is shown an HTML page of content

  

  // If no matching route is found default to home
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });



  app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });


  app.get('/assets/css/styles.css', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/assets/css/styles.css'));
  });

  app.get('/assets/js/index.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/assets/js/index.js'));
  });
};
