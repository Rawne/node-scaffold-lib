import * as express from 'express';
var app = express();

app.get('/', function (req:any, res:any) {
   res.send('Hello World');
});

var server = app.listen(3000, function() {
   var port = server.address().port;

   console.log('Chapp listening at port %s', port);
});