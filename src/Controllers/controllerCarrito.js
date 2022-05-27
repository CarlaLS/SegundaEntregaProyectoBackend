import {productosDAO} from '../daos/productos/index'
import {carritoDAO} from '../daos/carrito/index'


const controllerCarrito = {
  ListaCarrito: async (req, res) => {
    try {
      const todosCarrito = await carritoDAO.getAll()
      res.json(todosCarrito)
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  },

 getCarritoById: async (req, res) => {
    try {
      const cartId = req.params.id
      const carritoEncontrado = await carritoDAO.getById(cartId)

      if (!carritoEncontrado) {
        res.send({ error: 'Carrito no encontrado' })
      } else {
        res.json(carritoEncontrado)
      }
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  },
 
  ListaProductoCarrito: async (req, res) => {
    try {
      const cartId = req.params.id
      const carritoEncontrado = await carritoDAO.getById(cartId)

      if (!carritoEncontrado) {
        res.send({ error: 'Carrito no encontrado' })
      } else {
        res.json(carritoEncontrado.productos)
      }
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  },
  crearNuevoCarrito: async (req, res) => {
    try {
      const todosCarrito = await carritoDAO.getAll()
     

      const getNuevoId = () => {
        let ultimoID = 0
        if (todosCarrito.length) {
          ultimoID = todosCarrito[todosCarrito.length - 1].id
        }
        return ultimoID + 1
      }

      const nuevoCarrito = {
        id: getNuevoId(),
        productos: [],
      }

      await carritoDAO.add(nuevoCarrito)
      res.json(nuevoCarrito.id)
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  },

  addProductosAlCarrito: async (req, res) => {
    try {
      const cartId = req.params.id
      const prodId = req.params.id_prod
      
      const carritoEncontrado= await carritoDAO.getById(cartId)
      const productoEncontrado= await productosDAO.getById(prodId)                                                    
      if (!carritoEncontrado) {
        res.send({ error: 'Carrito no encontrado' })
      } else if (!productoEncontrado) {
        res.send({ error: 'Producto no encontrado' })
      } else {
        await carritoDAO.add(carritoEncontrado.id, productoEncontrado)
        const updatedCarrito = await carritoDAO.getById(cartId)
        res.json(updatedCarrito)
      }
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  },



  eliminarProductoCarrito: async (req, res) => {
    try {
      const cartId = req.params.id
      const prodId = req.params.id_prod

      const carritoEncontrado = await carritoDAO.getById(cartId)
      const productoEncontrado = await productosDAO.getById(prodId)

      if (!carritoEncontrado){
        res.send({ error: 'Carrito no encontrado' })
      } else if (!productoEncontrado) {
        res.send({ error: 'Producto no encontrado' })
      } else {
        
        await carritoDB.remove(carritoEncontrado.id, productoEncontrado.id)
        const updatedCarrito = await carritoDAO.getById(cartId)
        res.json(updatedCarrito)

      }
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  },

  vaciarCarrito: async (req, res) => {
    try {
      const cartId = req.params.id
      
      const carritoEncontrado = await carritoDAO.getById(cartId)

      if (!carritoEncontrado) {
        res.send({error: 'Carrito no encontrado'})
      } else {
        await carrito.vaciar(cartId)
        const updatedCarrito = await carritoDAO.getById(cartId)
        res.json(updatedCarrito)
      }
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  },
}

export default controllerCarrito
