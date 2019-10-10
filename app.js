const express = require('express');

const app = express();


app.use('/', express.static(__dirname + '/public'));


const server = app.listen(80, () => {
    console.log(`game server started on port ${server.address().port}`);
});

