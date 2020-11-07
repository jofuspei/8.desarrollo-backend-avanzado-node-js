# 8. Desarrollo backend avanzado con node.js

Repositorio de la práctica del módulo de **desarrollo backend avanzado con node.js** que consiste en una ampliación del la práctica anterior del API de **_Nodepop_**

<br />
<br />
<br />
<h1 align="center">🤑 NODEPOP 🤑</h1>

> Ejecutar los comandos desde la carpeta raíz del proyecto: **[nodepop](nodepop/)**

## Instalación de dependencias

```sh
  npm install
```

<br />

## Configuración de variables de entorno

Quitar la extensión _.example_ del archivo _.env.example_ e indicar las rutas correctas.
El archivo **.env** se utilizará en el proyecto con las rutas indicadas.


<br />

## Inicialización de la base de datos
Para cargar la base de datos con datos iniciales lanzamos el siginete comnado:

```sh
  npm run initDB
```

Los datos de los productos se encuentran en el archivo _productos.json_

**¡CUIDADO!** Este comando lanza un script que borra el contenido de la base de datos antes de inicializarla.

<br />

## Inicialización del proyecto


### Producción
```sh
  npm start
```

### Desarrollo

```sh
  npm run dev
```

<br />

## Métodos del API

### Listado de productos

GET /api/productos?**name**=Min&**selling**=true&**price**=1000-&**tag**=motor&**skip**=1&**limit**=3

```json
  {
    "products": [
    {
      "tags": [
        "motor"
      ],
      "_id": "5f5bcea9b91aae155bceb619",
      "name": "Mini Cooper Diesel",
      "selling": true,
      "price": 8650,
      "image": "mini_cooper.jpeg",
      "__v": 0
      }
    ]
  }
```

### Listado de tags

GET /api/productos/tags

```json
  {
    "tags": [
      "lifestyle",
      "mobile",
      "motor",
      "work"  
    ]
  }
```

### Creación de producto

Párametros:
  - tags
  - name
  - selling
  - price
  - image

POST /api/productos/add

```json
  {
    "added": {
        "tags": [
            "mobile"
        ],
        "_id": "5f5e20b7aae71a380fb58f5d",
        "name": "iPhone SE negro",
        "selling": true,
        "price": 235,
        "image": "iphone_se.jpeg",
        "__v": 0
    }
  }
```

### Carga de imágenes

POST /api/productos/upload

Párametros:
  - image

```
  Upload completed successfully
```