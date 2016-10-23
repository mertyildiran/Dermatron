Template.show_visits.helpers ({

  patientLookup: function(patientId) {
      return patients.findOne(patientId).name + ' ' + patients.findOne(patientId).surname;
  },

  status: function(_id) {
      visit = visits.findOne(_id);
      var time = visit.visitDateTime.split(/ /)[1].split(/:/);
      var date = visit.visitDateTime.split(/ /)[0].split(/-/);
      var d = new Date(date[0], date[1]-1, date[2], time[0], time[1], 0, 0);
      var start = d;
      d.setMinutes(d.getMinutes() + 5);
      var end = d;
      var now = new Date();
      if (start > now) {
          return "Future";
      } else if (end < now) {
          return "Past";
      } else {
          return "Now";
      }
  },

  placeImage: function(data) {
      if (data) {
          var image = '<figure> \
              <img alt="This visit" src="' + data + '" /> \
              <figcaption><p>This visit</p></figcaption> \
          </figure>';
          return image;
      } else {
          return '';
      }
  },

  previousImage: function(givenId, dateTime) {
      if (givenId) {
          var previousVisitImage = '<figure> \
              <img alt="Previous visit" src="' + visits.findOne({ patientId: givenId, visitDateTime: {$lt: dateTime} }, { sort: { visitDateTime: -1 } }).image + '" /> \
              <figcaption><p>Previous visit</p></figcaption> \
          </figure>';
          return previousVisitImage;
      } else {
          return '';
      }
  }

});

Template.show_visits.events ({

    // event handlers
    //'click #': function(evt, tpl) {
        //
    //}

});
