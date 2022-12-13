const socket = io();

socket.on('update-waiting', (active_users, players) => {
    board();
    refreshMoves(active_users, players);
})

// const messageContainer = document.getElementById('message-container');
// const messageForm = document.getElementById('send-container');
// const messageInput = document.getElementById('message-input');
// socket.on('chat-message', data => {
//     // console.log(data);
//     appendMessage(`${data.name}: ${data.message}`);
// })

// socket.on('update-waiting', (name, room) => {
//     // console.log(data);
//     appendMessage(`${name} is waiting in ${room}`);
// })

// socket.on('user-disconnected', name => {
//     // console.log(data);
//     appendMessage(`${name} disconnected `);
// })

// messageForm.addEventListener('submit', e => {
//     e.preventDefault();
//     const message = messageInput.value;
//     appendMessage(`You: ${message}`);
//     // to send information from the client to the server
//     socket.emit('send-chat-message', message);
//     // set to empty value so that message is empties out every time it's sent
//     messageInput.value = '';
// })

// function appendMessage(message) {
//     const messageElement = document.createElement('div');
//     messageElement.innerText = message;
//     messageContainer.append(messageElement);
// }