var request = require('request');
var fs = require('fs');
var https = require('https');
var im = require('imagemagick');
var _ = require("underscore");
require('./constants.js');

IMAGE_SIZE = '64';
DIAGNOSES = [];

for (var key in DIAGNOSES_DICT_SWAP) {
    DIAGNOSES.push(key);
}

// CAUTION: This is a recursive function
function downloader(nth) {

    if (nth >= (DIAGNOSES.length - 1)) {
        console.log('THE END');
        return 1;
    }

    var diagnosis_id = DIAGNOSES[nth];
    console.log(diagnosis_id + ':');
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
        var fiftySample = _.sample(dJson['Results'], 50);
        //dJson['Results'].forEach(function(element, index, array) {
        function resultsrecur(rth) {
            //console.log(rth);
            if (rth >= (fiftySample.length)) {
                console.log('\tEND');
                downloader(nth+1);
                return 1;
            }

            element = fiftySample[rth];

            console.log('\tRequest: ' + element.FileName);

            var file = fs.createWriteStream(diagnosis_id + '/' + element.FileName);
            file.on('finish', function () {
                //convert 010020VB.JPG -resize 64x64^ -gravity center -crop 64x64+0+0 result.jpg
                im.convert([diagnosis_id + '/' + element.FileName, '-resize', IMAGE_SIZE + 'x' + IMAGE_SIZE + '^', '-gravity', 'center', '-crop', IMAGE_SIZE + 'x' + IMAGE_SIZE + '+0+0', diagnosis_id + '/' + element.FileName],
                    function(err, stdout){
                      if (err) {
                          console.log('\t\t\tResize ' + IMAGE_SIZE + 'x' + IMAGE_SIZE + ': Failed!');
                          console.log(err);
                      } else {
                          console.log('\t\t\tResize ' + IMAGE_SIZE + 'x' + IMAGE_SIZE + ': ' + element.FileName + ' ', stdout);
                      }
                      resultsrecur(rth+1);
                });
            });

            https.get(largeImageUrl + element.FileName, function(response) {
                if (!error && response.statusCode == 200) {
                    console.log('\t\tPipe: ' + element.FileName);
                    response.pipe(file);
                } else {
                    console.log('\t\tPipe: Failed!');
                    resultsrecur(rth+1);
                }
            });

        }
        resultsrecur(0);
      }
    });

}

downloader(0);
//console.log(typeof(DIAGNOSES[1]));
