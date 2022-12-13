const { remove } = require('./models/moves');

const io = require('socket.io')();

let active_users = [];
let players = [];

function remove_player(id) {
    for(let i=0; i < active_users.length; i++){
        if(active_users[i].id == id){
            active_users.splice(i, 1);
            break;
        } else if (i<2 && players[i].id) {
            players.splice(i,1);
            break; 
        }
    }
}


function init(server) {
    
    io.attach(server);
    
    io.on('connection', function(socket) {
        console.log('client connected');

        socket.on('connect', (name) => {
            remove_player(socket.id);
            data = {
                ref: socket,
                name: name
            }
            active_users.push(data);
            io.emit('update-waiting', active_users, players);
        });

        socket.on('disconnect', () => {
            remove_player(socket.id);
            io.emit('update-waiting', active_users, players);
        });

        socket.on('play-button', () => {
            if (players.length < 2) {
                for(let i=0; i < active_users.length; i++){
                    if(active_users[i].id == id){
                        players.push(active_users[i]);
                        active_users.splice(i, 1);
                        break;
                    }
                }
            } else {
                console.log("too many players");
            }
            io.emit('update-playing', active_users);
        })

        socket.on('move', (board) => {
            io.emit('move', board);
        });

        socket.on('end-game', () => {
            io.emit('end-game')
        }) 
        
        socket.on('disconnect', () => {
            remove_player(socket.id);
        })
    })
}

module.exports.init = init;