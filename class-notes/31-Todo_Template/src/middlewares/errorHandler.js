"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */

module.exports = (err, req, res, next) => {
    const statusCode = res.errorStatusCode ?? 500

    const data = {
        error: true,
        message: err.message,
        cause: err.cause
    }

    if (req.originalUrl.startsWith('/api')) {
        res.status(statusCode).send(data)
    } else {
        res.render('errors', { data })
    }

}


