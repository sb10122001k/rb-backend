const express =require('express')
const { authenticateUser } = require('../middleware/authUSer')
const { getTodayData } = require('../controllers/dataController')
const router = express.Router()

router.get('/todayData',authenticateUser,getTodayData)

module.exports = router