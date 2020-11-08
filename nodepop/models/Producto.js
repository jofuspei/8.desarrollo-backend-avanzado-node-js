'use strict';

const mongoose = require('mongoose');
const path = require('path');
const cote = require('cote');

const thumbnailRequester = new cote.Requester({ name: 'thumbnail client'});

// Creación del esquema
const productoSchema = mongoose.Schema({
  name: {type: String, index: true},
  selling: {type: Boolean, index: true},
  price: {type: Number, index: true},
  image: String,
  tags: {type: [String], index: true}
},
{
  autoIndex: process.env.NODE_ENV !== 'production'
})

productoSchema.statics.list = function (filtro, limit, skip) {
  const query = Producto.find(filtro);
  query.limit(limit);
  query.skip(skip);

  return query.exec();
}

productoSchema.methods.getThumbnail = function(file) {
  
    const imgPath = path.join(__dirname, '../public/images', file.originalname);

    this.image = file.originalname

    thumbnailRequester.send({
      type: 'get thumbnail',
      image: imgPath
    });

}

// Creación del modelo
const Producto = mongoose.model('Producto', productoSchema);

// Exportación
module.exports = Producto;
