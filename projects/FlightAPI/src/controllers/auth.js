"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | Flight API
------------------------------------------------------- */
// Auth Controller:

const User = require('../models/user')
const passwordEncrypt = require('../helpers/passwordEncrypt')

module.exports = {

    login: async (req, res) => {

        const { userName, email, password } = req.body

        if (!((userName || email) && password)) {
            res.errorStatusCode = 401
            throw new Error("Username / Email and Password required!")
        }

        const user = await User.findOne({ $or: [{ userName }, { email }] })

        if (user?.password !== passwordEncrypt(password)) {
            res.errorStatusCode = 401
            throw new Error('Incorrect Credeantials!')
        }

        res.status(200).send({
            error: false
        })




    }
}