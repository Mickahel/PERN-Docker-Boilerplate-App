const express = require('express');
const path = require('path');
const app = express();

const dir = "C:/Users/Michelangelo/Desktop/Projects/PERN Boilerplate/PERN-Docker-Boilerplate-App"
app.use(express.static(path.join(dir, 'build')));
app.use(express.static(dir, {maxAge: 0}));

app.get('/*', function(req, res) {
  res.sendFile(path.join(dir, 'build', 'index.html'));
});



app.listen(9000, (response) =>{
  console.log("listening on 9000")
});