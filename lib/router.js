Router.configure({
  layoutTemplate: 'main'
});

Router.onAfterAction(function() {
    var projectName='Dermatron';
    try {
        if (Router.current().route.getName() !== "index"){
            try {
                document.title = projectName + ' | ' +
                    Router.current().route.getName().replace(/_/g, ' ');
            }
            catch (e) {
                // do nothing we probably trying to set title to a destroyed template
            }
        }
        else {
            try {
                document.title = projectName;
            }
            catch (e) {
                // do nothing we probably trying to set title to a destroyed template
            }
        }
    }
    catch (e){
        // do nothing we probably trying to set title to a server side route
    }
});

// map the home page (index) to / path
Router.route('index', {
    path: '/'
});

