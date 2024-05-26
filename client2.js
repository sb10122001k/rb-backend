const io = require('socket.io-client');
const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjIsImlhdCI6MTcxNjY1NTUzMiwiZXhwIjoxNzE3NTE5NTMyfQ.bAHd2MJcDQQBGcbqPJ0SEevjewEMkHWpj5xYAW2EFr8'
const socket = io('http://localhost:5000', {
  query: { token }
});
socket.on('connect',()=>{
    console.log("Connection succefully ")
})
socket.on('disconnect', () => {
  console.log('Disconnected from the server');
});
socket.on('newData', (data) => {
    console.log('New data received:', data);
  });