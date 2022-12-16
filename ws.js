const { Socket } = require('socket.io');

const io = require('socket.io')();

let active_users = [];
let players = [];

function remove_player(id) {
    for(let i=0; i < active_users.length; i++){
        if(active_users[i].ref.id == id){
            active_users.splice(i, 1);
            break;
        } else if (i < players.length && players[i].ref.id == id) {
            console.log("removed player");
            players.splice(i,1);
            break; 
        }
    }
    console.log(active_users);
}

function stop_game (id, new_players) {
    let color;
    console.log(players)
    if (players.length == 2 && id == players[0].ref.id) {
        color = "black";
    } else if (players.length == 2) {
        color = "white";
    }
    console.log(new_players)
    players[0].ref.emit('stop-game', color, new_players);
    players[1].ref.emit('stop-game', color, new_players);
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

        socket.on('send-chat-message', (message, name) => {
            socket.broadcast.emit('chat-message', {name: name ,message: message});
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

        socket.on('stop-play-button', () => {
            let index = undefined;
            for (let i = 0; i < players.length; i+=1) {
                if (players[i].ref.id == socket.id) {
                    index = i
                    break
                }
            }
            active_users.push(players[index])
            players.splice(index,1);
        })

        socket.on('move', (board, atk, opp, active) => {
            console.log(players);
            console.log(board);
            players[0].ref.emit('moved', board, atk, opp, active);
            players[1].ref.emit('moved', board, atk, opp, active);
        });

        socket.on('surrend', () =>{
            let new_players = []
            new_players.push({name : players[0].name, color: "white"})
            new_players.push({name : players[1].name, color: "black"})
            stop_game(socket.id, new_players)
        })

        // socket.on('end-game', () => {
        //     io.emit('end-game')
        // }) 
        
        socket.on('disconnect-online', () => {
            let new_players = []
            new_players.push({name : players[0].name, color: "white"})
            new_players.push({name : players[1].name, color: "black"})
            console.log(new_players)
            stop_game(socket.id, new_players);
            remove_player(socket.id);
        })

        socket.on('disconnect', () => {
            if (players.length == 2) {
                let new_players = []
                new_players.push({name : players[0].name, color: "white"})
                new_players.push({name : players[1].name, color: "black"})
                console.log(new_players)
                if (socket.id == players[0].ref.id) {
                    color = "black";
                    players[1].ref.emit('stop-game', "black", new_players);
                } else {
                    color = "white";
                    players[0].ref.emit('stop-game', "white", new_players);
                }
            }
            
            remove_player(socket.id);
        })
    })
}

module.exports.init = init;