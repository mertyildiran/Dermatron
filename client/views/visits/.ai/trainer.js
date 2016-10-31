var Sync = require('sync');
const pngToMatrix = require('png-to-matrix');
const brain = require("brain");


function asyncPngToMatrix(image_path, callback) {
    pngToMatrix(image_path, (matrix) => {
        var image = [];
        var flattened = [].concat.apply([], matrix);
        //console.log([].concat.apply([], flattened));

        flattened.forEach(function(element, index, array) {
            image.push( (element['r'] * Math.pow(255, 2) + element['g'] * 255 + element['b']) / Math.pow(255, 3) );
        });
        console.log(image_path + " loaded.");
        callback(null, image);
    })
}

Sync(function(){

    var net = new brain.NeuralNetwork();

    net.train([{input: asyncPngToMatrix.sync(null, "cat64.png"), output: { cat: 1 } },
               {input: asyncPngToMatrix.sync(null, "dog64.png"), output: { dog: 1 } }],  {
                  errorThresh: 0.005,  // error threshold to reach
                  iterations: 20000,   // maximum training iterations
                  log: true,           // console.log() progress periodically
                  logPeriod: 10,       // number of iterations between logging
                  learningRate: 0.005    // learning rate
                });

    var output = net.run(asyncPngToMatrix.sync(null, "dog64.png"));  // [0.987]
    console.log(output);
});
