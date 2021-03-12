var express = require('express');
var router = express.Router();
const filesFolder = './files/';
const fs = require('fs').promises;
const util = require('util');

const readXlsxFile = require('read-excel-file/node');

// File path.


/* GET home page. */
router.get('/', async (req, res, next) => {

  const files = [];

  const dirFiles = await fs.readdir(filesFolder);
  
  dirFiles.forEach( async (file) => {

    const sheets = await readXlsxFile(`${filesFolder}/${file}`, { getSheets: true });

    /* for (const sheet of sheets) {
      readXlsxFile(`${filesFolder}/${file}`).then((rows) => {
        console.log('rows: ', rows);
      });
    } */

    files.push({name: file, sheets});
  });

  console.log('files: ', files);
  
  setTimeout(() => {
    res.render('index', {
      page: 'Home',
      title: 'Welcom to excel to speech App', 
      desc: 'Upload files and play audio from the file list',
      files: files 
    });
  }, 1500);
});

module.exports = router;
