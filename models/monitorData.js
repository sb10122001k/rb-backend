module.exports = (sequelize, DataTypes) => {
    const MonitorData = sequelize.define('MonitorData', {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      temperature:{
        type:DataTypes.FLOAT,
        allowNull:false,
      },
      humidity:{
        type:DataTypes.FLOAT,
        allowNull:false,
      },
      pressure:{
        type:DataTypes.FLOAT,
        allowNull:false,
      },
      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
      
    });
  
    return MonitorData;
  };