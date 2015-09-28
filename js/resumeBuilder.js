var appendObjectProperties = function(object, location, formatter, propertyPlaceholder, valuePlaceholder) {
  for (var property in object) {
    var value = object[property];
    var data = formatter.replace(propertyPlaceholder, property)
                        .replace(valuePlaceholder, value);
    $(location).append(data);
  }
};

var appendListOfObjects = function(list, location, formatter, valuePlaceholder) {
  for (var key in list) {
    $(location).append(formatter.replace(valuePlaceholder, list[key]));
  }
};

var replaceData = function(data, formatter, dataPlaceholder) {
  dataPlaceholder = dataPlaceholder || '%data%';
  return formatter.replace(dataPlaceholder, data);
};

var bio = {
  'name': 'Sukriti Thapa',
  'role': 'Programmer',
  'contacts': {
    'mobile': "<a href='tel:6666666666'>666.666.6666</a>",
    'email': "<a href='mailto:st2fd@virginia.edu'>st2fd@virginia.edu</a>",
    'github': "<a href='https://github.com/sthapa15'>sthapa15</a>",
    'website': "<a href='http://sthapa15.github.io'>SukritiThapa</a>",
    'location': "<a href='#'>Falls Church, VA</a>"
  },
  'welcomeMessage': '   Welcome to my interactive resume!',
  'skills': [ 'HTML5/CSS3', 'Python', 'Django', 'JavaScript', 'Java',
              'Git', 'Rust 0.9', 'Markdown', 'Jekyll', 'Liquid'],
  'biopic': 'images/Suk.jpg',
  'display': function() {
    var name = replaceData(bio.name, HTMLheaderName); 
    var role = replaceData(bio.role, HTMLheaderRole).replace('<hr/>','');

    $('#header').prepend(role)
                .prepend(name);

    appendObjectProperties(bio.contacts, '#topContacts', HTMLcontactGeneric, '%contact%', '%data%');
    $('#topContacts').children().clone().appendTo('#footerContacts');

    $('#header').append(replaceData(bio.biopic, HTMLbioPic))
                .append(replaceData(bio.welcomeMessage, HTMLWelcomeMsg))
                .append(HTMLskillsStart);

    appendListOfObjects(bio.skills, '#skills', HTMLskills, '%data%');
  }
};

var education = {
  'schools': [
    {'name': 'University of Virginia',
     'location': 'Charlottesville, VA',
     'degree': 'Bachelor of Science',
     'majors': ['Computer Engineering'],
     'dates': 2015,
     'url': 'http://virginia.edu'
    }
  ],
  'display': function() {
    for (var i in this.schools) {
      $('#education').append(replaceData(i, HTMLschoolStart));
      var id = '#school-entry-' + i;
      var school = this.schools[i];
      $(id).append((replaceData(school.name, HTMLschoolName) + replaceData(school.degree, HTMLschoolDegree))
           .replace('#', school.url))
           .append(replaceData(school.dates, HTMLschoolDates))
           .append(replaceData(school.location, HTMLschoolLocation))
           .append(replaceData(school.majors, HTMLschoolMajor));
    }
  }
};

var work = {
  'jobs': [
    {'employer': 'University of Virginia',
     'title': 'Digital Logic Design Teaching Assistant',
     'location': 'Charlottesville, VA',
     'dates': '2013-2015',
     'description': 'Helped students with digital logic design and graded their lab reports'
    },
    {'employer': 'The Aerospace Corporation',
     'title': 'Software Engineering Intern',
     'location': 'Chantilly, VA',
     'dates': '2014',
     'description': 'Worked on various tools provided by Amazon Web Services to create data transfer between secure local networks and secure cloud servers.'
    },
    {'employer': 'Massachusetts Institute of Technology Office of Engineering and Outreach Programs',
     'title': 'Robotics Instructor',
     'location': 'Cambridge, MA',
     'dates': '2013',
     'description': 'Developed a course in Robotics at the high school level for a challenging summe program at MIT.'
    }
  ],
  'display': function() {
    for (var i in this.jobs) {
      $('#workExperience').append(replaceData(i, HTMLworkStart));
      var id = '#work-entry-' + i;
      var job = this.jobs[i];
      $(id).append((replaceData(job.employer, HTMLworkEmployer) + replaceData(job.title, HTMLworkTitle))
           .replace('href="#"', ''))
           .append(replaceData(job.dates, HTMLworkDates))
           .append(replaceData(job.location, HTMLworkLocation))
           .append(replaceData(job.description, HTMLworkDescription));
    }
  }
};

var projects = {
  'projects': [
    {'title': 'Interactive Resume',
     'dates': '2015',
     'description': 'Interactive resume project to learn javascript and showcase a hands on web page to attest to my javascript knowledge',
     'images': [
       'images/projectpic.PNG',
     ]
    }
  ],
  'display': function() {
    for (var i in this.projects) {
      $('#projects').append(replaceData(i, HTMLprojectStart));
      var id = '#project-entry-' + i;
      var project = this.projects[i];
      $(id).append(replaceData(project.title, HTMLprojectTitle))
           .append(replaceData(project.dates, HTMLprojectDates))
           .append(replaceData(project.description, HTMLprojectDescription));
      for (var j in project.images) {
        $(id).append(replaceData(project.images[j], HTMLprojectImage));
      }
    }
  }
};

bio.display();
education.display();
work.display();
projects.display();

$('#mapDiv').append(googleMap);


// $('#main').append(internationalizeButton);
function inName(name) {
  name = name.trim().split(" ");
  console.log(name);
  name[1] = name[1].toUpperCase();
  name[0] = name[0].slice(0,1).toUpperCase() +
    name[0].slice(1).toLowerCase();
  return name[0] + " " + name[1];
}