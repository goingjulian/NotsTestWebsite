const express = require('express');
const path = require('path');

const app = express();

app.use((req, res, next) => {
    console.log(req.headers);
    res.header('Server', 'TestWebsite');
    next();
})

app.get('/cacheTest.html', (req, res, next) => {
    return res.header('Cache-Control', 'Max-Age=10').sendFile(path.join(__dirname, './public', 'cacheTest.html'))
})
app.use('/', express.static(__dirname + '/public'));


const server = app.listen(80, () => {
    console.log(`game server started on port ${server.address().port}`);
});

