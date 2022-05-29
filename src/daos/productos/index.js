import config from '../../../config.js';
import mongoose from 'mongoose';

let productosDAO

switch (config.env) {
    case 'json':
        const { default: ProductosDaoArchivo } = await import('./ProductosDaoArchivo.js')
        productosDAO = new ProductosDaoArchivo(config.dbPath)
        break
    case 'firebase':
        const { default: ProductosDaoFirebase } = await import('./ProductosDaoFirebase.js')
        productosDAO = new ProductosDaoFirebase('productos', config.firestore)
        break
    case 'mongodb':
        const { default: ProductosDaoMongoDb } = await import('./ProductosDaoMongoDb.js')
        productosDAO = new ProductosDaoMongoDb('productos ', {
            id: Number,
            nombre: String,
            descripcion: String,
            foto_url: String,
            precio: Number,
            stock: Number,
        })
        break
    default:
        const { default: ProductosDaoMem } = await import('./ProductosDaoMem.js')
        productosDAO = new ProductosDaoMem()
        break
}

export { productosDAO }