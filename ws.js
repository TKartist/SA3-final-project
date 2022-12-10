const io = require('socket.io')();

const users = {};

function init(server) {

    io.attach(server);
    
    io.on('connection', function(socket) {
        console.log('client connected');

        socket.on('new-user', name => {
            users[socket.id] = name;
            socket.broadcast.emit('user-connected', name);
        })

        socket.on('send-chat-message', message => {
            // console.log(message);
            socket.broadcast.emit('chat-message', {message: message, name: users[socket.id]});
        })
        
        socket.on('disconnect', () => {
            socket.broadcast.emit('user-disconnected', users[socket.id]);
            delete users[socket.id]
        })
    })
}

module.exports.init = init;