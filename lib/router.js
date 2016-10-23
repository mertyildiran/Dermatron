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

Router.route('visits', {
    path: '/visits/',
    template: 'visits'
});

Router.route('new_visits', {
    path: '/visits/new/',
    template: 'new_visits'
});

Router.route('edit_visits', {
    path: '/visits/:_id/edit/',
    template: 'edit_visits',
    data: function() { return visits.findOne(this.params._id); }
});

Router.route('show_visits', {
    path: '/visits/:_id/',
    template: 'show_visits',
    data: function() { return visits.findOne(this.params._id); }
});

Router.route('medicines', {
    path: '/medicines/',
    template: 'medicines'
});

Router.route('/visits.xml', {
  where: 'server',
  action: function() {

    var xmlData = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
    xmlData += "<data>";

    var cursor = visits.find();
    if (cursor.count()) {
        cursor.forEach(function (visit) {
            var time = visit.visitDateTime.split(/ /)[1].split(/:/);
            var date = visit.visitDateTime.split(/ /)[0].split(/-/);
            var d = new Date(date[0], date[1], date[2], time[0], time[1], 0, 0);
            d.setMinutes(d.getMinutes() + 5);
            date = d.getFullYear()+'-'+("0" + d.getMonth()).slice(-2)+'-'+("0" + d.getDate()).slice(-2);
            time = ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
            xmlData += "<event id='" + visit._id + "' start_date='" + visit.visitDateTime.split(/ /)[0] + " " + visit.visitDateTime.split(/ /)[1] + "' end_date='" + date + " " + time + "' text='" + patients.findOne(visit.patientId).name + " " + patients.findOne(visit.patientId).surname + "' details='" + visit.lesion + "' />";
        });
    }

    xmlData += "</data>";

    this.response.writeHead(200, {'Content-Type': 'application/xml'});
    this.response.end(xmlData);
  }
});
