import express                   from 'express';
import React                     from 'react';
import { renderToString }        from 'react-dom/server'
import { RouterContext, match } from 'react-router';
import { Router, browserHistory } from 'react-router';
// import createLocation            from 'history';
import routes                    from 'routes';
import path                      from 'path';

const app = express();

if (process.env.NODE_ENV !== 'production') {
  require('./webpack.dev').default(app);
}

app.use(express.static(path.join(__dirname, 'dist')));

app.use( (req, res) => {

  // const location = location: req.url

  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if(err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    if(!renderProps)
      return res.status(404).end('Not found');

    function renderView() {

      const InitialView = (
          <RouterContext {...renderProps} />
      );

      const componentHTML = renderToString(InitialView);

      const HTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Redux Demo</title>
        </head>
        <body>
          <div id="react-view">${componentHTML}</div>
          <script type="application/javascript" src="/bundle.js"></script>
        </body>
      </html>
      `;

      return HTML;
    }

    const html = renderView();
    res.end(html);

  });

});

//import App from './shared/components/index';

// app.use(express.static(path.join(__dirname, 'dist')));
// app.get('/', function(request, response){
//   var html = renderToString(
//       React.createElement(App)
//   );
//   //response.send(App);
//   response.end(html);
// });

//
//
// app.use(function(req, res, next) {
//
//
//   match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
//     if (error) {
//       res.status(500).send(error.message)
//     } else if (redirectLocation) {
//       res.redirect(302, redirectLocation.pathname + redirectLocation.search)
//     } else if (renderProps) {
//       res.status(200).send(renderToString(<RoutingContext {...renderProps} />))
//     } else {
//       res.status(404).send('Not found')
//     }
//   })
//
//
// })

export default app;
