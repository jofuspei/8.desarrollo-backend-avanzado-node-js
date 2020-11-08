'use strict';

var express = require('express');
var router = express.Router();

const Usuario = require('../../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


/**
* POST /authenticate
*/
router.post('/', async (req, res, next) => {

    try {
        // Obtener credenciales
        const email = req.body.email;
        const password = req.body.password;

        // Buscar en la base de datos ese mail de usuario
        const usuario = await Usuario.findOne({ email: email });

        // Usuario no encontrado o credenciales incorrectas
        if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
            // Error de autenticación
            const error = new Error('Credenciales incorrectas');
            error.status = 401;
            next(error);
            return;
        }

        // Si las credenciales son correctas

        // Crear un token JWT
        jwt.sign({ _id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '2d' }, (err, tokenJWT) => {
            if (err) {
                return next(err);
            }

            res.json({ tokenJWT: tokenJWT });
        });

    } catch (err) {
        return next(err);
    }
});

module.exports = router;
