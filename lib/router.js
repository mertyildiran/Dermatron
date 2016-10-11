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

Router.route('diseases', {
    path: '/diseases/',
    template: 'diseases'
});

Router.route('new_diseases', {
    path: '/diseases/new/',
    template: 'new_diseases'
});

Router.route('edit_diseases', {
    path: '/diseases/:_id/edit/',
    template: 'edit_diseases',
    data: function() { return diseases.findOne(this.params._id); }
});

Router.route('show_diseases', {
    path: '/diseases/:_id/',
    template: 'show_diseases',
    data: function() { return diseases.findOne(this.params._id); }
});

Router.route('medicines', {
    path: '/medicines/',
    template: 'medicines'
});

Router.route('new_medicines', {
    path: '/medicines/new/',
    template: 'new_medicines'
});

Router.route('edit_medicines', {
    path: '/medicines/:_id/edit/',
    template: 'edit_medicines',
    data: function() { return medicines.findOne(this.params._id); }
});

Router.route('show_medicines', {
    path: '/medicines/:_id/',
    template: 'show_medicines',
    data: function() { return medicines.findOne(this.params._id); }
});

Router.route('/appointments.xml', {
  where: 'server',
  action: function() {

    var xmlData = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
    xmlData += "<data>";

    var cursor = appointments.find();
    if (cursor.count()) {
        cursor.forEach(function (appointment) {
            var time = appointment.appointmentTime.split(/:/);
            var date = appointment.appointmentDate.split(/-/);
            var d = new Date(date[0], date[1], date[2], time[0], time[1], 0, 0);
            d.setMinutes(d.getMinutes() + 5);
            date = d.getFullYear()+'-'+("0" + d.getMonth()).slice(-2)+'-'+("0" + d.getDate()).slice(-2);
            time = ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
            xmlData += "<event id='" + appointment._id + "' start_date='" + appointment.appointmentDate + " " + appointment.appointmentTime + "' end_date='" + date + " " + time + "' text='" + patients.findOne(appointment.patientId).name + " " + patients.findOne(appointment.patientId).surname + "' details='" + appointment.appointmentReason + "' />";
        });
    }

    xmlData += "</data>";

    this.response.writeHead(200, {'Content-Type': 'application/xml'});
    this.response.end(xmlData);
  }
});
