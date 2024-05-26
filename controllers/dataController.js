const { Op } = require("sequelize");
const { Monitor } = require("../models");


const getTodayData = async(req,res)=>{
    try {
        const userId = req.userId;
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        console.log("herere")

        const todayData = await Monitor.findAll({
            where: {
              userId: userId,
              timestamp: {
                [Op.gte]: startOfDay,
                [Op.lte]: endOfDay,
              },
            },
          });
          res.status(200).json({data:todayData})
    } catch (error) {
        console.log(error)
        res.status({
            status:false,
            message:'Error Fetching data',
            error:error
        })
    }
}


module.exports={
    getTodayData
}