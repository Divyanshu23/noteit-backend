const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require("../models/users")
const JWT_SECRET = "key@2319"

const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body
    const user = await User.findOne({email})
    if(!user)
        return res.status(400).json({ success: false, error: "Invalid Credentials" })

    if(!await bcrypt.compare(password, user.password))
        return res.status(400).json({ success: false, error: "Invalid Credentials" })

    try {
        const jwtToken = await jwt.sign({ userid: user.id }, JWT_SECRET)
        res.status(200).json({ success: true, authToken: jwtToken })
    } catch (error) {
        res.status(500).json({ success: true, error: "Some internal error occured" })
    }

}

module.exports = login