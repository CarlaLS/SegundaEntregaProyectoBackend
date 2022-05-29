import config from '../../../config.js'
import mongoose from 'mongoose';

let carritoDAO

switch (config.env) {
    case 'json':
        const { default: CarritoDaoArchivo } = await import('./CarritoDaoArchivo.js')
        carritoDAO = new CarritoDaoArchivo(config.dbPath)
        break
    case 'firebase':
        const { default: CarritoDaoFirebase } = await import('./CarritoDaoFirebase.js')
        carritoDAO = new CarritoDaoFirebase('carrito', config.firestore)
        break
    case 'mongodb':
        const { default: CarritoDaoMongoDb } = await import('./CarritoDaoMongoDb.js')
        carritoDAO = new CarritoDaoMongoDb(
            'carrito',
            new mongoose.Schema({
                id:Number,
                productos:Array,
            })
        )
        break
    default:
        const { default: CarritoDaoMem } = await import('./CarritoDaoMem.js')
        carritoDAO = new CarritoDaoMem()
        break
}

export { carritoDAO }