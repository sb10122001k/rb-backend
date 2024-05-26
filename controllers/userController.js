const { User } = require("../models")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    try {
        console.log(req.body)
        const { email, name, password } = req.body
        if (!email || !name || !password) {
            return res.status(400).json({ status: false, message: 'Email, Password and Name is required' })
        }
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        if (user) {
            return res.status(400).json({ status: false, message: 'User already exist' })
        }

        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUND))

        const newUser = await User.create({
            email: email,
            password: hashedPassword,
            name: name,
            status: '0'
        })

        console.log(newUser.id)

        const token = jwt.sign({ userid: newUser.id }, process.env.JWT_SECRET_KEY, { expiresIn: '10d' })

        res.status(201).json({ staus: true, message: 'User Create Successfully', token: token, data: { email: newUser.email, name: newUser.name } })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            message: 'Error Creating User',
            error: error
        })
    }
}


const login = async (req, res) => {
    try {

        const { email, password } = req.body
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        if (!user) {
            return res.status(400).json({
                status: false,
                message: 'User does not exist'
            })
        }
        const passwordValidation =await bcrypt.compare(password, user.password)
        console.log(passwordValidation,"Validation")
        if (!passwordValidation) {
            return res.status(400).json({ status: false, message: 'Password Authentication Failed' })
        }
        const token = jwt.sign({ userid: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '10d' })

        res.status(200).json({ staus: true, message: 'Login Successfull', token: token, data: { email: user.email, name: user.name } })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            message: 'Error While Login',
            error: error
        })
    }
}
module.exports = {
    signup,
    login
}