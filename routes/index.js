var express = require('express');
var router = express.Router();
const filesFolder = './files/';
const fs = require('fs');

/* GET home page. */
router.get('/', (req, res, next) => {

  const files = [];

  fs.readdirSync(filesFolder).forEach(file => {
    files.push(file);
  });
  
  res.render('index', {
    page: 'Home',
    title: 'Welcom to excel to speech App', 
    desc: 'Upload files and play audio from the file list',
    files: files 
  });
});

module.exports = router;
