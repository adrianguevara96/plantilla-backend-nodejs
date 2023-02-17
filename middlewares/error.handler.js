//Middleware para manerar errores

function logError (err, req, res, next) {
    console.error(err);
    next(err)
}

function errorHandler(err, req, res, next) {
    res.status(500).json({
        message: err.message,
        stack: err.stack
    })
}

function boomErrorHandler(err, req, res, next){
    if (err.isBoom) {
        const { output } = err;
        res.status(output.statusCode).json(output.payload);
    }
    next(err);
}

//Sequelize Error Handler
function sequelizeErrorHandler(err, req, res, next){
    if(err.parent){
        res.status(409).json({
            name: err.name,
            message: err.errors[0].message,
            detail: err.parent.detail
        })
    }
    next(err);
}

//Sequelize Error Handles in the course
function ormErrorHandler(err, req, res, next) {
    if (err instanceof ValidationError) {
        res.status(409).json({
            statusCode: 409,
            message: err.name,
            errors: err.errors
        });
    }
    next(err);
  }

module.exports = { logError, errorHandler, boomErrorHandler, sequelizeErrorHandler }