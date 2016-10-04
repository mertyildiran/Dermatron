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


Router.route('patients', {
    path: '/patients/',
    template: 'patients'
});

Router.route('new_patients', {
    path: '/patients/new/',
    template: 'new_patients'
});

Router.route('edit_patients', {
    path: '/patients/:_id/edit/',
    template: 'edit_patients',
    data: function() { return patients.findOne(this.params._id); }
});

Router.route('show_patients', {
    path: '/patients/:_id/',
    template: 'show_patients',
    data: function() { return patients.findOne(this.params._id); }
});

Router.route('appointments', {
    path: '/appointments/',
    template: 'appointments'
});

Router.route('new_appointments', {
    path: '/appointments/new/',
    template: 'new_appointments'
});

Router.route('edit_appointments', {
    path: '/appointments/:_id/edit/',
    template: 'edit_appointments',
    data: function() { return appointments.findOne(this.params._id); }
});

Router.route('show_appointments', {
    path: '/appointments/:_id/',
    template: 'show_appointments',
    data: function() { return appointments.findOne(this.params._id); }
});
