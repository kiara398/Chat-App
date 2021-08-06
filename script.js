const socket = io('http://localhost:3000')
const chatForm = document.getElementById('send')
const chatContainer = document.getElementById('messages')
const messageInput = document.getElementById('msg')

const names = prompt('What is your name')
appendMessage(`You joined`)
socket.emit('new-user', names)

socket.on('chat-message', data =>{
    appendMessage(`${data.names}: ${data.message}`)
    chatContainer.scrollTop = chatContainer.scrollHeight;
})
socket.on('user-connected', names =>{
    appendMessage(`${names} connected`)
})

socket.on('user-disconnected', names =>{
    appendMessage(`${names} disconnected`)
})


chatForm.addEventListener('submit', e =>{
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function appendMessage(message){
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageElement.style = "border:none; border-radius:10px; background-color:grey; color:black; padding:10px; margin-top:10px;"
chatContainer.append(messageElement)
}

