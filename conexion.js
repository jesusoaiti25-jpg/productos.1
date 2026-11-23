const Sequelize = require('sequelize');
const productoModelo = require('./models/producto');

// Conexión a la base de datos
//const conexion = new Sequelize('productosEVD1', 'root', 'jesussqlea', {
//    host: 'localhost',
//    port: 3306,
//    dialect: 'mysql'
//});

//conexion a la base de datos en la nube
const conexion = new Sequelize('productosEVD1', '*', '*', {
    host: '',
    port: '',
    dialect: 'mysql'
    dialectOptions: {
        ssl: {
            minVersion: 'TLSv1.2',
            rejectUnauthorized: true
        }
    }
});

const Producto = productoModelo(conexion);

// Verificar la conexión y sincronizar modelo
conexion.sync({ force: false })
    .then(() => {
        console.log('Conexión a la base de datos establecida correctamente');
    })
    .catch((e) => {
        console.log('Error al conectar a la base de datos:', e);
    });

module.exports = { Producto };