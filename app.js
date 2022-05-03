const express = require('express');

// express app
const app = express();

// listen for requests
app.listen(3000);

app.get('/', (req, res) => {
  // res.send('<p>home page</p>');
  res.sendFile('index.html', { root: __dirname });
});

app.get('/about', (req, res) => {
  // res.send('<p>about page</p>');
  res.sendFile('about.html', { root: __dirname });
});

// redirects
app.get('/about-us', (req, res) => {
  res.redirect('/about');
});

// 404 page
app.use((req, res) => {
  res.status(404).sendFile('404.html', { root: __dirname });
});