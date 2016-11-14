var Sync = require('sync');
const translate = require('google-translate-api');
var writeFile = require('write');

require("jsdom").env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }

    var $ = require("jquery")(window);

    fs = require('fs')
    fs.readFile('derm.html', 'utf8', function (err,data) {
        if (err) {
        return console.log(err);
        }
        //console.log(data);

        Sync(function(){
            var str = "";
            $(data).find('#diagnosis label').each(function(index) {
                key = $(this).text();
                turkish = asyncTranslate.sync(null, key)
                console.log(turkish);
                str += '\n\
                "' + key + '": {\n\
                    en_US: "' + key + '",\n\
                    en_GB: "' + key + '",\n\
                    tr_TR: "' + turkish + '"\n\
                },';
            });
            console.log(str);

            writeFile('dump.js', str, function(err) {
                if (err) console.log(err);
            });
        });


    });

});



function asyncTranslate(string, callback) {
    translate(string, {from: 'en', to: 'tr'}).then(res => {
        callback(null, res.text);
    }).catch(err => {
        callback(null, 'SOMETHING WENT WRONG');
    });
}
