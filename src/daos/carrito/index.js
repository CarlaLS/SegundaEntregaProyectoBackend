

let carritoDAO

switch (process.env.PERS) {
    case 'json':
        const { default: CarritoDaoArchivo } = await import('./CarritoDaoArchivo.js')
        carritoDAO = new CarritoDaoArchivo('carrito')
        break
    case 'firebase':
        const { default: CarritoDaoFirebase } = await import('./CarritoDaoFirebase.js')
        carritoDAO = new CarritoDaoFirebase()
        break
    case 'mongodb':
        const { default: CarritoDaoMongoDb } = await import('./CarritoDaoMongoDb.js')
        carritoDAO = new CarritoDaoMongoDb()
        break
    default:
        const { default: CarritoDaoMem } = await import('./CarritoDaoMem.js')
        carritoDAO = new CarritoDaoMem()
        break
}

export { carritoDAO }