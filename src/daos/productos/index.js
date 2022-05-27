
let productosDAO

switch (process.env.PERS) {
    case 'json':
        const { default: ProductosDaoArchivo } = await import('./ProductosDaoArchivo.js')
        productosDAO = new ProductosDaoArchivo('productos')
        break
    case 'firebase':
        const { default: ProductosDaoFirebase } = await import('./ProductosDaoFirebase.js')
        productosDAO = new ProductosDaoFirebase()
        break
    case 'mongodb':
        const { default: ProductosDaoMongoDb } = await import('./ProductosDaoMongoDb.js')
        productosDAO = new ProductosDaoMongoDb()
        break
    default:
        const { default: ProductosDaoMem } = await import('./ProductosDaoMem.js')
        productosDAO = new ProductosDaoMem()
        break
}

export { productosDAO }