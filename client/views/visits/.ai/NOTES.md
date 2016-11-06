**Data:**

    Elapsed time in seconds: 1:35
    Number of classes: 4
    Number of samples: 5
    for 4 x 5 = 20, 1:35 (95 seconds)

    Elapsed time in seconds: 7:23
    Number of classes: 5
    Number of samples: 50
    for 5 x 50 = 250, 7:23 (443 seconds)

    Elapsed time in seconds: 16:21
    Number of classes: 6
    Number of samples: 100
    for 6 x 100 = 600, 16:21 (981 seconds)

    Elapsed time in seconds: 69:10
    Number of classes: 19
    Number of samples: 200
    for 19 x 200 = 3800, 69:10 (4150 seconds)

**Conclusion:**

    For 30 times more complex training, 10 times more time needed.
    For 190 times more complex training, 43 times more time needed.
    Network reaches 0.005 error threshold around 2000 iterations every time. A valid observation.

**Prediction:**

    For roughly 8000 samples and 727 classes ( 8000 x 727 = 5,816,000 ) according to Power Curve Fit;
    It will take 1,394,748 seconds which equals roughly to 16 days to teach whole dataset using 1 core processor.
    And every 11 minutes there must be an iteration log on nohup.
