const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use( express.static( "public" ) );

app.set('view engine', 'ejs');

app.get('/t', (req, res) => {
    res.render('t');
});

app.get('/m', (req, res) => {
    res.render('m');
});

io.on('connection', function (socket) {
    console.log("connected");
    // EVENEMENT COMMAND RECU DU M
    socket.on('command', function(data) {
        console.log('COMMNAND', data);
        //ENVOYER LA COMMANDE AU T
        socket.broadcast.emit('command', data);
    });
});

http.listen(2758);