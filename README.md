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
  npm run pm2
```

### Desarrollo

```sh
  npm run pm2-dev
```

<br />

## Métodos del API

### Obtención del token JWT al autenticarse con un usuario correcto

Párametros:
  - email
  - password

```json
  {
    "tokenJWT": "xxx.yyy.zzz"
  }
```

POST /api/authenticate

### Creación de producto generando imagen y su correspondiente thumbnail

_**Nota:** Se ha protegido el api de productos con JWT. Para acceder a el es necesario autenticarse y obtener un token_

Párametros:
  - tags
  - name
  - selling
  - price
  - image (archivo)

POST /api/productos

```json
  {
    "added": {
        "tags": [
            "lifestyle"
        ],
        "_id": "5fa83215dbda617055373860",
        "name": "Monitor Dell U2521",
        "selling": false,
        "price": 325,
        "__v": 0
    }
}
```