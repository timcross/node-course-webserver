const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((request, response, next) => {
  var now = new Date().toString();
  var logMessage = `${now}: ${request.method} ${request.url}`;
  console.log(logMessage);
  fs.appendFile('server.log', logMessage + `\n`, (error) => {
    if (error) {
      console.log('Unable to write to server.log');
    }
  });
  next();
});

// app.use((request, response, next) => {
//   response.render('maintenance.hbs', {
//     pageTitle: 'Maintenance Page'
//   })
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (request, response) => {
  response.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to the test website. We hope you enjoy yourself.'

  })
});

app.get('/about', (request, response) => {
  response.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (request, response) => {
  response.send({
    errorMessage: 'Bad request'
  });
});

const portNumber = 3000;
app.listen(portNumber, () => {
  console.log(`Server is up on port ${portNumber}`);
});
