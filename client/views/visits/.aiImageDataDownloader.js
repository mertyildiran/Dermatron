var request = require('request');
var fs = require('fs');
var https = require('https');

var diagnosis_id = '109487';
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

        console.log(element.FileName);

        var file = fs.createWriteStream(diagnosis_id + '/' + element.FileName);
        https.get(largeImageUrl + element.FileName, function(response) {
            if (!error && response.statusCode == 200) {
                console.log('piping');
                response.pipe(file);
            }
        });

    });
  }
})
