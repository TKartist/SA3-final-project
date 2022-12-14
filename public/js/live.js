const socket = io();

document.getElementById("myOffer").style.display = "none";

// Connect / Disconnect to server
document.getElementById("connect").addEventListener('click', () => {
    socket.emit("connect-online", document.querySelector(".sidebar0 h1").textContent);
    document.getElementById("myConnect").style.display = "block";
    document.getElementById("connect").style.display = "none";
    document.querySelector(".player-1-timer-container h2").innerHTML = document.querySelector(".sidebar0 h1").textContent;
})

document.getElementById("disconnect").addEventListener('click', () => {
    socket.emit("disconnect-online", document.querySelector(".sidebar0 h1").textContent);
    document.getElementById("myConnect").style.display = "none";
    document.getElementById("connect").style.display = "block";
    document.querySelector(".player-1-timer-container h2").innerHTML = "Player 1"
})

let main = document.querySelector(".mlist");

socket.on("refresh", last_move => {
    console.log(last_move);
    let newTr = document.createElement('tr');
    let newChild = document.createElement('td');
    newChild.innerHTML = last_move;
    newTr.appendChild(newChild);
    main.appendChild(newTr);
});

const messageContainer = document.getElementById('myForm');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

socket.on('chat-message', data => {
    console.log(data.message);
    appendMessage(`${data.name} : ${data.message}`);
})

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    console.log("send message")
    appendMessage(`You: ${message}`);
    // to send information from the client to the server
    socket.emit('send-chat-message', message, document.querySelector('.sidebar0 h1').textContent);
    // set to empty value so that message is empties out every time it's sent
    messageInput.value = '';
})

function appendMessage(message) {
    const messageElement = document.createElement('h6');
    messageElement.innerText = message;
    console.log("received message")
    messageContainer.appendChild(messageElement);
}