'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const usuarioSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String
});

usuarioSchema.statics.hashPassword = function(unhashedPass) {
  return bcrypt.hash(unhashedPass, 10);
}

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
