const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require("../models/users")
const JWT_SECRET = "key@2319"

const signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, password } = req.body

    if (await User.findOne({ email }))
        return res.status(400).json({ success: false, error: "User with same email already exixts" })
        
    const salt = await bcrypt.genSalt(6)
    const hashedPassword = await bcrypt.hash(password, salt)

    User.create({
        name: name,
        email: email,
        password: hashedPassword
    })
        .then(async (user) => {
            try {
                const jwtToken = await jwt.sign({ userid: user.id }, JWT_SECRET)
                res.status(200).json({ success: true, authToken: jwtToken })
            } catch (error) {
                res.status(500).json({ success: true, error: "Some internal error occured" })
            }
        })
        .catch((err) => { res.status(400).send({ success: false, error: err }) })
}

module.exports = signup