var app       = require('app');
var browser   = require('browser-window');
var electrify = require('electrify')(__dirname);

var window    = null;

var loadingWindow;
function createLoadingWindow () {
  // Create the browser window.
  loadingWindow = new browser({width: 800, height: 600, transparent: true, frame: false, icon: NativeImage.createFromPath(__dirname + '/icon-128.png')})

  // and load the loading.html of the app.
  loadingWindow.loadURL(`file://${__dirname}/loading.html`)

  // Open the DevTools.
  //loadingWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  loadingWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    loadingWindow = null
  })
}

app.on('ready', function() {

  createLoadingWindow();

  // electrify start
  electrify.start(function(meteor_root_url) {

    // creates a new electron window
    window = new browser({
      width: 1280, height: 768,
      transparent: true, frame: false,
      icon: NativeImage.createFromPath(__dirname + '/icon-128.png'),
      'node-integration': false // node integration must to be off
    });

    loadingWindow.close();
    window.maximize();

    // open up meteor root url
    window.loadURL(meteor_root_url);
  });
});


app.on('window-all-closed', function() {
  app.quit();
});


app.on('will-quit', function terminate_and_quit(event) {

  // if electrify is up, cancel exiting with `preventDefault`,
  // so we can terminate electrify gracefully without leaving child
  // processes hanging in background
  if(electrify.isup() && event) {

    // holds electron termination
    event.preventDefault();

    // gracefully stops electrify
    electrify.stop(function(){

      // and then finally quit app
      app.quit();
    });
  }
});

//
// =============================================================================
//
// the methods bellow can be called seamlessly from your Meteor's
// client and server code, using:
//
//    Electrify.call('methodname', [..args..], callback);
//
// ATENTION:
//    From meteor, you can only call these methods after electrify is fully
//    started, use the Electrify.startup() convenience method for this
//
//
// Electrify.startup(function(){
//   Electrify.call(...);
// });
//
// =============================================================================
//
// electrify.methods({
//   'method.name': function(name, done) {
//     // do things... and call done(err, arg1, ..., argN)
//     done(null);
//   }
// });
//
