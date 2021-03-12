var express = require('express');
var router = express.Router();
const filesFolder = './files/';
const fs = require('fs').promises;
const cryptoRandomString = require('crypto-random-string');
const readXlsxFile = require('read-excel-file/node');
const path = require('path');
const googleTTS = require('google-tts-api');

/* GET home page. */
router.get('/', async (req, res, next) => {

  const files = [];

  const dirFiles = await fs.readdir(filesFolder);
  
  dirFiles.forEach( async (file) => {

    const sheets = await readXlsxFile(`${filesFolder}/${file}`, { getSheets: true });

    files.push({id: cryptoRandomString({length: 10}), name: file, sheets});
  });
  
  setTimeout(() => {
    res.render('index', {
      page: 'Home',
      title: 'Welcom to excel to speech App', 
      desc: 'Upload files and play audio from the file list',
      files: files
    });
  }, 1500);
});

router.post('/convert', async (req, res, next) => {

  const sheetName = req.body.sheet;

  const dirFiles = await fs.readdir(filesFolder);
  
  let textBody = ``;

  dirFiles.forEach( async (file) => {

    const sheets = await readXlsxFile(`${filesFolder}/${file}`, { getSheets: true });

    for (const sheet of sheets) {
      if(sheet.name === sheetName) {
        const data = await readXlsxFile(`${filesFolder}/${file}`, {sheet: sheetName});

        for (let index = 0; index < data.length; index++) {
          const rowArr = data[index];
          textBody += rowArr.join();
        }
      }
    }

    console.log('textBody: ', textBody);

    setTimeout(async () => {
      if(textBody.length) {
        const getAllAudioBase64 = await googleTTS.getAllAudioBase64(textBody, 
          {
              lang: 'tr',
              slow: false,
              host: 'https://translate.google.com',
              splitPunct: ',.?',
          });

          await fs.unlink(path.join(__dirname, '../public/speech.mp3'));

          getAllAudioBase64.forEach((item, i) => fs.writeFile(path.join(__dirname, '../public/speech.mp3'), Buffer.from(item.base64.replace('data:audio/mp3; codecs=opus;base64,', ''), 'base64')));
      }
      
    }, 1000);
    

  });


  res.send({
    success: true,
    message: 'speech file created'
  })

});

module.exports = router;
