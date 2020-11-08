'use strict';

const jwt = require('jsonwebtoken');

module.exports = function() {
    return (req, res, next) => {

        const tokentJWT = req.get('Authorization') || req.query.token || req.body.token;

        // Mostramos error en caso de no obtener un token
        if(!tokentJWT) {
            const error = new Error('No se ha proporcionado un token');
            error.status = 401;
            next(error);
        }

        // Verificación del token
        jwt.verify(tokentJWT, process.env.JWT_SECRET, (err, decoded) => {
            if(err) {
                return next(err);
            }

            req.apiAuthUserId = decoded._id;
            next();
        })

    }
}