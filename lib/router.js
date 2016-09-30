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


Router.route('person', {
    path: '/person/',
    template: 'person'
});

Router.route('new_person', {
    path: '/person/new/',
    template: 'new_person'
});

Router.route('edit_person', {
    path: '/person/:_id/edit/',
    template: 'edit_person',
    data: function() { return person.findOne(this.params._id); }
});

Router.route('show_person', {
    path: '/person/:_id/',
    template: 'show_person',
    data: function() { return person.findOne(this.params._id); }
});
