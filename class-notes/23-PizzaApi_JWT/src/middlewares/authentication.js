"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

const Token = require('../models/token')
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {

    req.user = null

    const auth = req.headers?.authorization // Token ...tokenKey... || Bearer ...accessToken...
    const tokenKey = auth ? auth.split(' ') : null // ['Token', '...tokenKey...'] || ['Bearer', '...accessToken...']

    if(tokenKey){
        if (tokenKey[0] == 'Token') { //simple token

            const tokenData = await Token.findOne({ token: tokenKey[1] }).populate('userId')
            
            req.user = tokenData ? tokenData.userId : false
        }else if(tokenKey[0] == 'Bearer'){//jwt
                jwt.verify(tokenKey[1], process.env.ACCESS_KEY, (err, accessData)=> {
                    req.user = accessData ? accessData : null
                })


        }

    }

   

    next()
}