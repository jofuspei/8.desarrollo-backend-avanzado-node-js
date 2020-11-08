'use strict';

const cote = require('cote');
const jimp = require('jimp');

const thumbnailResponder = new cote.Responder({ name: 'thumbnail responder'});

thumbnailResponder.on('get thumbnail', async (req) => {

    const thumbnailPath = req.image.slice(0, req.image.lastIndexOf('.')) + '_thumbnail' + req.image.slice(req.image.lastIndexOf('.'));

    console.log('Creating' + req.image + 'thumbnail');

    const image = await jimp.read(req.image);
    
    return image.resize(jimp.AUTO, 100).write(thumbnailPath);
  
  });
