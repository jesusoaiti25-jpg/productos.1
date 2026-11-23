const express = require('express');
const productoRoutes = require('./routes/producto-routes');
const app = express();

// Definir el motor de plantillas
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Definir la ruta para los productos
app.use('/', productoRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});