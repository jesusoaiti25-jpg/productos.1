const router = require('express').Router();
const { Producto } = require('../conexion');

// Ruta inicial
router.get('/', (req, res) => {
    res.render('pages/index');
});

// Ruta para mostrar la página de insertar un producto (coincide con insertaProducto.ejs)
router.get(['/insertarProducto', '/insertaProducto'], (req, res) => {
    res.render('pages/insertaProducto');
});

// Ruta para guardar un producto en la base de datos
router.post('/guardarProducto', (req, res) => {
    Producto.create(req.body)
        .then(() => {
            console.log('Se insertó correctamente');
            res.redirect('/listaProductos');
        })
        .catch((e) => {
            console.log("Error al insertar: " + e);
            res.status(400).send("Error al insertar: " + e);
        });
});

// Ruta para mostrar la lista de productos (coincide con listaProducto.ejs)
router.get(['/listaProductos', '/listarProductos', '/listaProducto'], (req, res) => {
    Producto.findAll()
        .then((data) => {
            res.render('pages/listaProducto', { productos: data });
        })
        .catch((e) => {
            console.log("Error al obtener productos: " + e);
            res.status(500).send("Error al obtener productos: " + e);
        });
});

// Ruta para buscar un producto por su id (coincide con modificarProducto.ejs)
router.get('/buscarProducto/:idProducto', (req, res) => {
    Producto.findAll({
        where: {
            idProducto: req.params.idProducto
        }
    })
        .then((data) => {
            res.render('pages/modificarProducto', { productos: data });
        })
        .catch((e) => {
            console.log("Error al buscar producto: " + e);
            res.status(500).send("Error al buscar producto: " + e);
        });
});

// Ruta para modificar un producto
router.post('/modificarProducto', (req, res) => {
    const idProducto = req.body.idProducto;
    const productoModificado = {
        nombreProducto: req.body.nombreProducto,
        marcaProducto: req.body.marcaProducto,
        precioProducto: req.body.precioProducto
    };

    Producto.update(productoModificado, {
        where: {
            idProducto: idProducto
        }
    })
        .then(() => {
            console.log('Producto modificado correctamente');
            res.redirect('/listaProductos');
        })
        .catch((e) => {
            console.log('Error al modificar: ' + e);
            res.status(500).send('Error al modificar: ' + e);
        });
});

// Ruta para eliminar un producto
router.get('/eliminarProducto/:idProducto', (req, res) => {
    Producto.destroy({
        where: {
            idProducto: req.params.idProducto
        }
    })
        .then(() => {
            console.log('Producto eliminado correctamente');
            res.redirect('/listaProductos');
        })
        .catch((e) => {
            console.log('Error al eliminar: ' + e);
            res.status(400).send('Error al eliminar: ' + e);
        });
});

module.exports = router;