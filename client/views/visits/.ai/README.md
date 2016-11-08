### Network Configuration:

    hiddenLayers: [64],
    errorThresh: 0.005,  
    iterations: 20000,   
    log: true,           
    logPeriod: 1,       
    learningRate: (1 / Math.sqrt( number_of_classes * number_of_samples ) )


### Data:

    Elapsed time in seconds: 0:3
    Number of classes: 4
    Number of samples: 5
    for 4 x 5 = 20, 0:3 (3 seconds)
    iterations: 63 training error: 0.004981011763285451

    Elapsed time in seconds: 1:14
    Number of classes: 5
    Number of samples: 50
    for 5 x 50 = 250, 1:14 (74 seconds)
    iterations: 178 training error: 0.004972310038611753

    Elapsed time in seconds: 3:59
    Number of classes: 6
    Number of samples: 100
    for 6 x 100 = 600, 3:59 (239 seconds)
    iterations: 276 training error: 0.004973116105134418

    Elapsed time in seconds: 22:7
    Number of classes: 19
    Number of samples: 200
    for 19 x 200 = 3800, 22:7 (1327 seconds)
    iterations: 780 training error: 0.00499365684773361

    Elapsed time in seconds: 59:49
    Number of classes: 27
    Number of samples: 400
    for 27 x 400 = 10800, 59:49 (3540 seconds)
    iterations: 1026 training error: 0.004996683848590019


### Predictions:

For **8972 samples** and **727 classes** ( 8972 x 727 = **6,522,644** ) according to **Power Curve Fit**;

 - It will take **1,484,615 seconds** which equals to roughly **17 days** to train the whole dataset using **1 core processor**.

 - And it will take **16,268 iterations** to reach **0.005 error threshold goal**. So that means; every 1.5 minutes (90 seconds) there must be a new iteration log in nohup.out.
