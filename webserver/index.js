const express = require('express');
const path = require('path');
const app = express();

const dir = "C:/Users/Michelangelo/Desktop/Projects/PERN Boilerplate/PERN-Docker-Boilerplate-Frontend"
app.use(express.static(path.join(dir, 'build')));
app.use(express.static(dir, {maxAge: 0}));
/*app.use(express.static(dir, { cacheControl: true, setHeaders: function(res, path) { 
  res.setHeader("Cache-Control","max-age=0,must-revalidate");  
} }));*/
/*app.get("/service-worker.js", (req, res) => {
  res.sendFile(path.resolve(dir, "public", "service-worker.js"));
});
*/
app.get('/*', function(req, res) {
  res.sendFile(path.join(dir, 'build', 'index.html'));
});



app.listen(9000, (response) =>{
  console.log("listening on 9000")
});