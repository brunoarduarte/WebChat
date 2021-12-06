const socket = io('http://localhost:3000');

function renderMessage(message) {
  const divMessages = document.querySelector('.messages');
  const p = document.createElement("p")
  const textNode = document.createTextNode(`${message.author}: ${message.message}`)
  divMessages.append(textNode, p);
};

socket.on('previousMessages', (messages) => {
  for(message of messages) {
    renderMessage(message);
  }
});

socket.on('receivedMessage', (message) => {
  renderMessage(message);
});

const formChat = document.querySelector('#chat')

formChat.addEventListener('submit', function(event) {
  event.preventDefault();

  const author = document.querySelector('input[name="username"]').value;

  const message = document.querySelector('input[name="message"]').value;
  
  if (author.length && message.length) {
    const messageObject = {
      author,
      message,
    };
    
    renderMessage(messageObject);

    socket.emit('sendMessage', messageObject);
  };
});