//Load HTTP module
const http = require('http');
const fs = require('fs');
const path = require('path');
const googleTTS = require('google-tts-api');

const hostname = '127.0.0.1';
const port = 3003;

//Create HTTP server and listen on port 3000 for requests
const server = http.createServer(async (req, res) => {
    res.writeHead(200, { 'content-type': 'text/html' });
    fs.createReadStream('index.html').pipe(res);

    const getAllAudioBase64 = await googleTTS.getAllAudioBase64(`Samsun'da sokak ortasında bir kadına öldüresiye şiddet, sosyal medyada infial uyandırdı! Eski eşi tarafından öldüresiye dövülen kadın hastaneye kaldırıldı. Adalet Bakanı Gül, failin gözaltına alındığını açıkladı. Samsun Cumhuriyet Başsavcılığı ise soruşturmanın titizlikle yürütüldüğünü duyurdu. Aile ve Sosyal Politikalar Bakanı Zehra Zümrüt Selçuk, davaya müdahil olacaklarını açıkladı. İletişim Başkanı Fahrettin Altun da vahşetin hesabının sorulacağını bildirdi. 3 yıl önce boşandığı eski eşini 5 yaşındaki kızlarının gözü önünde tekme tokat döven İbrahim Zarap (27),emniyetteki işlemlerinin ardından sevk edildiği adliyede 'adam öldürmeye teşebbüs' suçundan tutuklandı. Saldırgan Zarap, polisteki ifadesinde "Kızımı teslim ederken bana, 'Sana bir daha kızı göstermeyeceğim' gibi şeyler söyledi. Bir anda gözüm döndü ve sinir krizi geçirmişim. O yüzden böyle yaptım. Olaydan sonra çevredekiler beni darp etti. Eğer kimlikleri tespit edilebilirse hepsinden şikayetçi olacağım... Görüntüleri izledim, kendimi tanıyamadım" dedi. Samsun Cumhuriyet Başsavcılığı ise, darbedilen kadın ile çocuğunun koruma altına alındığını açıkladı`, 
    {
        lang: 'tr',
        slow: false,
        host: 'https://translate.google.com',
        splitPunct: ',.?',
    });

    const dest = path.resolve(__dirname, `decoded.mp3`);

    getAllAudioBase64.forEach((item, i) => fs.appendFileSync(dest, Buffer.from(item.base64.replace('data:audio/mp3; codecs=opus;base64,', ''), 'base64')));

});

//listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});