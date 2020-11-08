'use strict';

require('dotenv').config();

const readline = require('readline');

const conn = require('./lib/connectMongoose');
const Producto = require('./models/Producto');
const Usuario = require('./models/Usuario');

const productos = require('./productos.json');

conn.once('open', async () => {
  try {
    const answer = await askUser('¿Inicializar la base de datos? ( si / \x1B[4mno\x1B[0m ) ');
    if (answer.toLowerCase() !== 'si') {
      console.log('Proceso abortado');
      return process.exit(0);
    }

    console.log('-----------------');
    await initProductos();
    console.log('-----------------');
    await initUsuarios();
    console.log('-----------------');

    console.log('Carga finalizada');
    conn.close();
    
  } catch (error) {
    console.log('Ha ocurrido un error', err);
    process.exit(1);
  }
});

async function initProductos() {
  // Borrado de documentos de la colección
  console.log('Vaciando colección de productos...');
  await Producto.deleteMany();

  // Cargado de documentos inicial
  console.log('Cargando productos...')
  const result = await Producto.insertMany(productos.productos);
  console.log(result.length, 'productos añadidos');
}

async function initUsuarios() {
  // Borrado de documentos de la colección
  console.log('Vaciando colección de usuarios...');
  await Usuario.deleteMany();

  // Cargado de documentos inicial
  console.log('Cargando usuarios...')
  const result = await Usuario.insertMany([
    { email: 'user@example.com', password: await Usuario.hashPassword('1234') },
    { email: 'user2@example.com', password: await Usuario.hashPassword('4321') }
  ]);
  console.log(result.length, 'usuarios añadidos');
}

function askUser(q) {
  return new Promise( (resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(q, (ans) => {
      rl.close();
      resolve(ans);
    })
  })
}