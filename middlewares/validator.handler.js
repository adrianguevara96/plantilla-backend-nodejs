const boom = require('@hapi/boom');

function validatorHandler(schema, property) {
    //usamos clousures
    return (req, res, next) => {
        //property de forma dinamica ['params' || 'body' || '']
        const data = req[property];
        const { error } = schema.validate(data, { abortEarly: false});
        if (error) {
            next(boom.badRequest(error));
        }
        next();
    }
}

module.exports = validatorHandler;