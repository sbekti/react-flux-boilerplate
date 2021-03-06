import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import serveFavicon from 'serve-favicon';

const staticPath = path.resolve(__dirname, '../static');

export default function (callback) {
  const app = express();

  app.set('env', process.env.NODE_ENV || 'development');
  app.set('host', process.env.HOST || '0.0.0.0');
  app.set('port', process.env.PORT || 3000);

  app.use(bodyParser.json());
  //app.use(serveFavicon(`${staticPath}/assets/favicon.png`));
  app.use(express.static(staticPath));

  app.use((err, req, res, next) => {
    console.log('Error on request %s %s', req.method, req.url);
    console.log(err);
    console.log(err.stack);
    res.status(500).send('Internal server error');
  });

  return app.listen(app.get('port'), () => callback(app));
}
