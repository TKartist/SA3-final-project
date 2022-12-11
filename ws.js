const io = require('socket.io')();

const users = {waiting_users: [], playing_users: []}

const rooms = [users, users, users];

const ids = {};

function init(server) {
    
    io.attach(server);
    
    io.on('connection', function(socket) {
        console.log('client connected');

        socket.on('enter-room', (name, room_id) => {
            ids[socket.id] = room_id;
            data = {
                ref: socket,
                name: name
            }
            rooms[room_id].waiting_users.push(data);
            io.emit('update-waiting', name, room_id);
        });

        socket.on('send-chat-message', message => {
            // console.log(message);
            socket.broadcast.emit('chat-message', {message: message, name: users[socket.id]});
        })
        
        socket.on('disconnect', () => {
            let name;
            console.log(ids[socket.id])
            let room_id = ids[socket.id];
            console.log(room_id)
            // for (let i = 0; i < rooms[room_id].waiting_users.length; i++) {
            //     console.log(rooms[room_id].waiting_users[i]);
            //     if (rooms[room_id].waiting_users[i].ref.id == socket.id) {
            //         name = rooms[room_id].waiting_users[i].name;
            //         delete rooms[room_id].waiting_users[i];
            //         delete ids[socket.id]
            //         break;
            //     } else if (i < 2 && rooms[room_id].playing_users[i].ref.id == socket.id) {
            //         name = rooms[room_id].playing_users[i].name;
            //         delete rooms[room_id].playing_users[i];
            //         delete ids[socket.id]
            //         // stop the game
            //     }
            // }
            io.emit('user-disconnected', "hi")
        })
    })
}

module.exports.init = init;