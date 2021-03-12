var express = require('express');
var router = express.Router();
const filesFolder = './files/';
const fs = require('fs').promises;
const cryptoRandomString = require('crypto-random-string');
const readXlsxFile = require('read-excel-file/node');

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

    files.push({id: cryptoRandomString({length: 10}), name: file, sheets});
  });

  console.log('files: ', files);

  const convert = async (fileId) => {
    console.log('convert file', fileId);
  }
  
  setTimeout(() => {
    res.render('index', {
      page: 'Home',
      title: 'Welcom to excel to speech App', 
      desc: 'Upload files and play audio from the file list',
      files: files,
      clickHandler: convert
    });
  }, 1500);
});

router.post('/convert', async (req, res, next) => {

  console.log('body: ', req.body);

  res.send({
    message: 'teşekkürler'
  })

});

module.exports = router;
