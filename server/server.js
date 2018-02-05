const HTTP_PORT = 80;
const HTTPS_PORT = 443;

const express    = require('express');        // call express
const app        = express();                 // define our app using express
const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const privateKey  = fs.readFileSync(path.resolve(__dirname, './crt/privatekey.key'), 'utf8');
const certificate = fs.readFileSync(path.resolve(__dirname, './crt/certificate.crt'), 'utf8');
const credentials = {key: privateKey, cert: certificate};
const es6Renderer = require('express-es6-template-engine');

const settings = require('./server.config');
const router = require('../serverSrc/router');

app.engine('html', es6Renderer);
app.set('views', path.resolve(__dirname, '../serverSrc/views'));
app.set('view engine', 'html');

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(router);

app.get(['/', '/*'], function (req, res) {
    res.status(404).render('404');
});

app.all('*', function(req, res, next){
    console.log(req.method, req.url);
    next();
});

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(HTTP_PORT, function(){console.log("listening: ", HTTP_PORT);});
httpsServer.listen(HTTPS_PORT, function(){console.log("listening: ", HTTPS_PORT);});
console.log(settings.welcomeMessage);