const pngToMatrix = require('png-to-matrix');
const brain = require("brain");

n_of_images = 0

dog_image = [];
pngToMatrix("dog64.png", (matrix) => {
    flattened = [].concat.apply([], matrix);
    //console.log([].concat.apply([], flattened));

    flattened.forEach(function(element, index, array) {
        dog_image.push( (element['r'] * Math.pow(255, 2) + element['g'] * 255 + element['b']) / Math.pow(255, 3) );
    });
    console.log("Dog image loaded.");
    n_of_images += 1;
    nowTrain();
});


cat_image = [];
pngToMatrix("cat64.png", (matrix) => {
    flattened = [].concat.apply([], matrix);
    //console.log([].concat.apply([], flattened));

    flattened.forEach(function(element, index, array) {
        cat_image.push( (element['r'] * Math.pow(255, 2) + element['g'] * 255 + element['b']) / Math.pow(255, 3) );
    });
    console.log("Cat image loaded.");
    n_of_images += 1;
    nowTrain();
});

function nowTrain() {
    if (n_of_images == 2) {
        console.log('Well done mr pottar');

        var net = new brain.NeuralNetwork();

        net.train([{input: cat_image, output: { cat: 1 } },
                   {input: dog_image, output: { dog: 1 } }],  {
                      errorThresh: 0.005,  // error threshold to reach
                      iterations: 20000,   // maximum training iterations
                      log: true,           // console.log() progress periodically
                      logPeriod: 10,       // number of iterations between logging
                      learningRate: 0.005    // learning rate
                    });

        var output = net.run(dog_image);  // [0.987]
        console.log(output);

    }
}
