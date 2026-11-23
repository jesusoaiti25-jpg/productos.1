const { DataTypes } = require('sequelize');

module.exports = (conexion) => {
    const Producto = conexion.define('producto', {
        idProducto: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombreProducto: {
            type: DataTypes.STRING,
            allowNull: false
        },
        marcaProducto: {
            type: DataTypes.STRING,
            allowNull: false
        },
        precioProducto: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    }, {
        tableName: 'productos',
        timestamps: false
    });

    return Producto;
};