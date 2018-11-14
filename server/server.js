const express = require ('express');
const app = express();
const path = require('path');

const publicPath = path.join(__dirname, '..', 'build');

app.use(function(req, res, next) {
    res.setHeader("Content-Security-Policy", "script-src 'self' https://apis.google.com");
    return next();
});

app.get('/*', (req, res) => {
    res.sendFile(publicPath, 'index.html');
});

app.use(function(req, res, next) {
    res.setHeader("Content-Security-Policy", "script-src 'self' https://apis.google.com");
    return next();
});
app.use(express.static(publicPath));

app.listen (3000, () => {
    console.log("Server is up");
});

