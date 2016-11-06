var Sync = require('sync');
const pngToMatrix = require('png-to-matrix');
const brain = require("brain");
var recursiveReadSync = require('recursive-readdir-sync');
var jsonfile = require('jsonfile')


function asyncPngToMatrix(image_path, callback) {
    pngToMatrix(image_path, (matrix) => {
        var image = [];
        var flattened = [].concat.apply([], matrix);
        //console.log([].concat.apply([], flattened));

        flattened.forEach(function(element, index, array) {
            image.push( (element['r'] * Math.pow(255, 2) + element['g'] * 255 + element['b']) / Math.pow(255, 3) );
        });
        //console.log(image_path + " loaded.");
        callback(null, image);
    })
}

function getDataset(path) {
    var files;
    var dataset = [];
    try {
      files = recursiveReadSync(path);
      for(var i = 0, len = files.length; i < len; i++){
        var dict = {};
        var dict2 = {};
        //console.log('{input: asyncPngToMatrix.sync(null, "' + files[i] + '"), output: { ' + files[i].split("/")[files[i].split("/").length-2] + ': 1 } }');
        dict['input'] = asyncPngToMatrix.sync(null, files[i]);
        dict2[files[i].split("/")[files[i].split("/").length-2]] = 1;
        dict['output'] = dict2;
        //console.log(dict);
        dataset.push(dict);
      }
      return dataset;
    } catch(err){
      if(err.errno === 34){
        console.log('Path does not exist');
        return 0;
      } else {
        //something unrelated went wrong, rethrow
        throw err;
        return 0;
      }
    }
}

Sync(function(){

    var net = new brain.NeuralNetwork();

    var start = new Date();
    console.log(start);
    net.train( getDataset('images') ,  {
                  errorThresh: 0.005,  // error threshold to reach
                  iterations: 20000,   // maximum training iterations
                  log: true,           // console.log() progress periodically
                  logPeriod: 1,       // number of iterations between logging
                  learningRate: 0.005    // learning rate
                });
    end = new Date();
    console.log(end);

    var json = net.toJSON();
    var file = './net.json'
    jsonfile.writeFile(file, json, function (err) {
        if (err) {
            console.error(err);
        }
    });

    var elapsed = end - start;
    var min = (elapsed/1000/60) << 0;
    var sec = (elapsed/1000) % 60;
    console.log('\nElapsed time in seconds: ' + min + ':' + sec);

    //console.log(getDataset('images')[0]['input']);
    var output = net.run(getDataset('images')[0]['input']);  // [0.987]
    console.log('Number of classes: ' + Object.keys(output).length);
    console.log('Number of samples: ' + getDataset('images').length + '\n');
    console.log(output);
});
