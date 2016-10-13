import * as express from 'express';
const app = express(); //please

app.get('/', function (req:any, res:any) {
   res.send('Hello World');
});

const server = app.listen(3000, function() {
   let port = server.address().port;

   console.log('Chapp listening at port %s', port);
});