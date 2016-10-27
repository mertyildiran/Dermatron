var request = require('request');
var fs = require('fs');
var https = require('https');
var im = require('imagemagick');
require('./constants.js');

IMAGE_SIZE = '64';

for (var key in DIAGNOSES_DICT_SWAP) {

    var diagnosis_id = key;
    if (!fs.existsSync(diagnosis_id)){
        fs.mkdirSync(diagnosis_id);
    }

    diagnosisString = 'diagnosis=' + diagnosis_id;
    var dermQuestUrl = 'https://www.dermquest.com/Services/imageData.ashx?' + diagnosisString + '&page=1&perPage=500&sort=relevance';
    var largeImageUrl = 'https://www.dermquest.com/imagelibrary/large/';

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Replace this line with rejectUnauthorized: false,
    request(dermQuestUrl, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var dJson = JSON.parse(body);
        dJson['Results'].forEach(function(element, index, array) {

            console.log('Request: ' + element.FileName);

            var file = fs.createWriteStream(diagnosis_id + '/' + element.FileName);
            file.on('finish', function () {
                //convert 010020VB.JPG -resize 64x64^ -gravity center -crop 64x64+0+0 result.jpg
                im.convert([diagnosis_id + '/' + element.FileName, '-resize', IMAGE_SIZE + 'x' + IMAGE_SIZE + '^', '-gravity', 'center', '-crop', IMAGE_SIZE + 'x' + IMAGE_SIZE + '+0+0', diagnosis_id + '/' + element.FileName],
                    function(err, stdout){
                      if (err) throw err;
                      console.log('\t\tResize ' + IMAGE_SIZE + 'x' + IMAGE_SIZE + ': ' + element.FileName + ' ', stdout);
                });
            });

            https.get(largeImageUrl + element.FileName, function(response) {
                if (!error && response.statusCode == 200) {
                    console.log('\tPipe: ' + element.FileName);
                    response.pipe(file);
                }
            });

        });
      }
    });

}
