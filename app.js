const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();
const connectToDatabase = require('./config/database');
const { saveRandomData } = require('./helper/randomDataGenerator');
const { verifyToken } = require('./middleware/validateToken');
const { User } = require('./models');

const app = express();

app.use(cors());
app.use(express.json());

connectToDatabase();

app.use('/user', require('./rotues/userRoute'));
app.use('/data',require('./rotues/dataRoute'))

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});


const userSocketMap = new Map(); 


io.use((socket, next) => {
    const token = socket.handshake.query.token;
    verifyToken(token, (err, decoded) => {
      if (err) {
        return next(new Error('Authentication error'));
      }
      socket.userId = decoded.userid;
      next();
    });
  });
  
io.on('connection', async (socket) => {
    console.log(socket.userId);
    console.log(`A user has connected ${socket.userId}`);
    userSocketMap.set(socket.userId, socket.id);

    try {
      await User.update(
        { status: '1' },
        { where: { id: socket.userId } }
      );
    } catch (error) {
      console.error('Error updating user status to active:', error);
    }
  
    socket.on('disconnect', async () => {
      console.log(`A user is disconnected ${socket.userId}`);
      userSocketMap.delete(socket.userId);

      try {
        await User.update(
          { status: '0' },
          { where: { id: socket.userId } }
        );
      } catch (error) {
        console.error('Error updating user status to inactive:', error);
      }
    });
  });

setInterval(()=>{
    saveRandomData(io,userSocketMap) 
},10000)



const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports=userSocketMap
