import ContenedorMongoDb from '../../classes/ContenedorMongoDb'

class CarritoDaoMongoDB extends ContenedorMongoDb {
  constructor() {
    super('carrito', {
      id: { type: Number, required: true },
      productos: { type: Array, required: false },
      
    })
  }
}

export default CarritoDaoMongoDB