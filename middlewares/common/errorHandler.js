const createError = require('http-errors');

//! 404 Not Found error handler
function notFoundHandler(req, res, next) {
    next(createError(404, 'Your requested content was not found!'));
}


//! Default error handler
function errorHandler(err, req, res, next) {
    if(process.env.NODE_ENV === 'development') {
        console.log(err);
    }

    if(err.status != 404){
        err.status = 500;
        err.message = 'Internal Server Error';
    }

    res.status(err.status).json({
        message: err.message,
        status: err.status
    });
}


module.exports = {
    notFoundHandler,
    errorHandler
};