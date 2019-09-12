var http = require('http'),
      bodyParser = require('body-parser'),
      express = require('express'),
      routes = require('./routes');

var port = process.env.PORT ||  7070,
      app = express(),
      server = http.createServer(app);

routes(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

server.listen(port, () => {
    console.log("Listening on port " + port);
});

