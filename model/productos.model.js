const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let productosSchema = new Schema({
    codigo: {
        type: String
    },
    nombre: {
        type: String
    },
    precio: {
        type: Double
    }
	existencia: {
		type: Double
	}
}, {
    collection: 'Productos'
})

module.exports = mongoose.model('ProductosSchema', productosSchema)