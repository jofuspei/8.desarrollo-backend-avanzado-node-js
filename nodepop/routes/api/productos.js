var express = require('express');
var router = express.Router();
const multer = require('multer');

const Producto = require('../../models/Producto');

// Listado de productos con filtros
router.get('/', async function(req, res, next) {
  try {
    
    const tag = req.query.tag;
    const selling = req.query.selling;
    const price = req.query.price;
    const name = req.query.name;
    const limit = parseInt(req.query.limit || 5);
    const skip = parseInt(req.query.skip);

    const filtro = {}
    if(tag) { filtro.tags = tag }
    if(selling) { filtro.selling = selling }
    if(name) { filtro.name = { $regex: "^" + name, $options: 'i' } }
    if(price) {
      const prices = price.split("-");
      if(prices.length === 1) {
        // Caso X (Igual a ese valor)
        filtro.price = price;
      } else {
        if(prices[1] === '') {
          // Caso -X (Menor que el valor)
          filtro.price = { $gte: prices[0] }
        } else if (prices[0] === '') {
          // Caso X- (Mayor que el valor)
          filtro.price = { $lt: prices[1] }
        } else {
          // Caso X-Y (Rango de valores)
          filtro.price = { $gte: prices[0], $lt: prices[1] }
        }
      }
    }
    
    const productosFiltrados = await Producto.list(filtro, limit, skip);

    res.json({ "products": productosFiltrados });
  } catch (error) {
    next(error);
  }
})

// Listado de tags
router.get('/tags', async function(req, res, next) {
  try {
    const tags = await Producto.distinct('tags');
    res.json({ "tags": tags });
  } catch (error) {
    next(error);
  }
});

// Creación de anuncio
router.post('/add', async function(req, res, next) {
  try {
    const productoData = req.body;
    const producto = new Producto(productoData);

    const productoInsertado = await producto.save();

    res.json({ "added": productoInsertado });
  } catch (error) {
    next(error);
  }
});

// Subida de imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    const myFilename = file.originalname;
    cb(null, myFilename);
  }
})
const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), (req, res, next) => {
  res.send('Upload completed successfully');
})

// Creación de anuncio (con image thumbnail)
router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    const producto = new Producto(req.body);

    const thumbnail = await producto.getThumbnail(req.file);

    const productoInsertado = await producto.save();

    res.json({ "added": productoInsertado, "thumbnail": thumbnail });
  } catch (error) {
    next(error);
  }
});


module.exports = router;
