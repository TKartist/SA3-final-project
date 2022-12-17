const { disconnect } = require('mongoose');
const { Socket } = require('socket.io');

const io = require('socket.io')();

let active_users = [];
let players = [];

function remove_player(id) {
    for (let i = 0; i < active_users.length; i++) {
        if (active_users == undefined) {
            active_users.splice(i, 1);
        }
        else if (active_users[i].ref.id == id) {
            console.log("before :"+ active_users)
            active_users.splice(i, 1);
            console.log("after :"+ active_users)
            break;
        } else if (i < players.length && players[i].ref.id == id) {
            console.log("removed player");
            players.splice(i, 1);
            break;
        }
    }
    console.log(active_users);
}

function stop_game(id, new_players) {
    let color;
    console.log(players)
    if (id == players[0].ref.id) {
        color = "black";
    } else {
        color = "white";
    }
    console.log(new_players)
    players[0].ref.emit('stop-game', color, new_players);
    players[1].ref.emit('stop-game', color, new_players);
}


function init(server) {

    io.attach(server);

    io.on('connection', function (socket) {
        console.log('client connected');

        socket.on('connect-online', (name) => {
            remove_player(socket.id)
            console.log("added :") 
            console.log(active_users);
            data = {
                ref: socket,
                name: name
            }
            active_users.push(data);
            console.log(active_users);
        });

        socket.on('send-chat-message', (message, name) => {
            socket.broadcast.emit('chat-message', { name: name, message: message });
        });

        socket.on('refresh-moves', table => {
            if(players.length == 2) {
                if (socket.id == players[0].ref.id) {
                    players[1].ref.emit('refresh',table);
                } else {
                    players[0].ref.emit('refresh',table);
                }
            }
        })

        socket.on('play-button', () => {
            if (players.length < 2) {
                for (let i = 0; i < active_users.length; i++) {
                    if (active_users[i].ref.id == socket.id) {
                        players.push(active_users[i]);
                        active_users.splice(i, 1);
                        break;
                    }
                }
                if (players.length == 2) {
                    players[0].ref.emit('start-match', "white", players[1].name);
                    players[1].ref.emit('start-match', "black", players[0].name)
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
            for (let i = 0; i < players.length; i += 1) {
                if (players[i].ref.id == socket.id) {
                    index = i
                    break
                }
            }
            active_users.push(players[index])
            players.splice(index, 1);
        })

        socket.on('move', (board, atk, opp, active) => {
            console.log(players);
            console.log(board);
            players[0].ref.emit('moved', board, atk, opp, active);
            players[1].ref.emit('moved', board, atk, opp, active);
        });

        socket.on('stop-game', () => {
            active_users.push(players[0]);
            active_users.push(players[1])
            players=[];
            socket.emit('stop-game');
        })



        socket.on('surrend', () => {
            let new_players = []
            new_players.push({ name: players[0].name, color: "white" })
            new_players.push({ name: players[1].name, color: "black" })
            console.log("new_players")
            console.log(new_players)
            stop_game(socket.id, new_players)
        })

        // socket.on('end-game', () => {
        //     io.emit('end-game')
        // })

        socket.on('disconnect-online', () => {
            if (players.length == 2) {
                let new_players = []
                new_players.push({ name: players[0].name, color: "white" })
                new_players.push({ name: players[1].name, color: "black" })
                console.log(new_players)
                stop_game(socket.id, new_players);
            }
            remove_player(socket.id);
        })

        socket.on('disconnect', () => {
            if (players.length == 2) {
                let new_players = []
                new_players.push({ name: players[0].name, color: "white" })
                new_players.push({ name: players[1].name, color: "black" })
                console.log(new_players)
                if (socket.id == players[0].ref.id) {
                    color = "black";
                    players[1].ref.emit('stop-game', "black", new_players);
                } else if (socket.id == players[1].ref.id) {
                    color = "white";
                    players[0].ref.emit('stop-game', "white", new_players);
                }
            }
            remove_player(socket.id);
        })
    })
}

module.exports.init = init;
