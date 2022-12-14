const io = require('socket.io')();

let active_users = [];
let players = [];

function remove_player(id) {
    for(let i=0; i < active_users.length; i++){
        if(active_users[i].ref.id == id){
            active_users.splice(i, 1);
            break;
        } else if (i < players.length && players[i].ref.id == id) {
            players.splice(i,1);
            break; 
        }
    }
    console.log(active_users);
}


function init(server) {
    
    io.attach(server);
    
    io.on('connection', function(socket) {
        console.log('client connected');

        socket.on('connect-online', (name) => {
            console.log(name)
            remove_player(socket.id);
            data = {
                ref: socket,
                name: name
            }
            active_users.push(data);
            console.log(active_users);
            
        });

        socket.on('send-chat-message', message => {
            socket.broadcast.emit('chat-message', {name: active_users.id ,message: message});
        });

        socket.on('play-button', () => {
            if (players.length < 2) {
                for(let i=0; i < active_users.length; i++){
                    if(active_users[i].ref.id == socket.id){
                        players.push(active_users[i]);
                        active_users.splice(i, 1);
                        break;
                    }
                }
                if (players.length == 2) {
                    players[0].ref.emit('start-match', "white");
                    players[1].ref.emit('start-match', "black")
                }
                console.log("added player")
            } else {
                console.log("too many players");
            }
            console.log("players: ")
            console.log(players);
            console.log("active : ")
            console.log(active_users);
        })

        socket.on('move', (board) => {
            console.log("het")
            socket[0].ref.emit('move', board);
            socket[1].ref.emit('move', board);
        });

        // socket.on('end-game', () => {
        //     io.emit('end-game')
        // }) 
        
        socket.on('disconnect-online', () => {
            remove_player(socket.id);
        })
    })
}

module.exports.init = init;