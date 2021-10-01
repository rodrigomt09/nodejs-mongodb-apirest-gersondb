const express = require('express');
const app = express();
const productosExpressRoute = express.Router();

// Productos schema
let ProductosSchema = require('../model/productos.model');

// Obtener productos
productosExpressRoute.route('/').get((req, res) => {
    ProductosSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Crear productos
productosExpressRoute.route('/create-productos').post((req, res, next) => {
    ProductosSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});


// Obtener producto unico
productosExpressRoute.route('/get-productos/:id').get((req, res) => {
    ProductosSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Actulizar producto
productosExpressRoute.route('/update-productos/:id').put((req, res, next) => {
    ProductosSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data)
            console.log('productos successfully updated!')
        }
    })
})

// Eliminar producto
productosExpressRoute.route('/remove-productos/:id').delete((req, res, next) => {
    ProductosSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = productosExpressRoute;