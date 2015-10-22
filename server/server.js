import express from 'express';

let app = express();

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log('server is listening on ', app.get('port'));
});
