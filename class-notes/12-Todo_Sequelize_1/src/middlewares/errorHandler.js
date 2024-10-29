'use strict'


module.exports = (err, req, res, next) => {
    const statusCode = res.errorStatusCode ?? 500
    console.log('errorHandler worked.')
    res.status(statusCode).send({
        error: true, // special data
        message: err.message, // error string message
        cause: err.cause, // error option cause
        // stack: err.stack, // error details
    })
}
