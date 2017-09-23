const express = require('express');
const app = express();
const path = require('path');

app.set("port", (process.env.PORT || 3000));

app.use(express.static('public'));


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});


const server = app.listen(process.env.PORT || 3000, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});