const { User, Monitor } = require("../models");

const generateRandomData = () => {
  return {
    temperature: (Math.random() * 10) + 20,
    humidity: (Math.random() * 40) + 30,
    pressure: (Math.random() * 20) + 980
  };
};

const saveRandomData = async (io,userSocketMap) => {
  try {
    const users = await User.findAll({ where: { status: '1' } });
    users.forEach(async (user) => {
      const data = generateRandomData();
      const monitorData = await Monitor.create({
        userId: user.id,
        temperature: data.temperature,
        humidity: data.humidity,
        pressure: data.pressure
      });
      const socketId = userSocketMap.get(user.id);
      if (socketId) {
        // Emit data to the specific user
        io.to(socketId).emit('newData', monitorData);
      }
    });
  } catch (error) {
    console.log("Error:", error);
  }
};

module.exports = { saveRandomData };
