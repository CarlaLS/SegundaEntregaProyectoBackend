
import {productosDAO} from '../daos/productos/index'




const controllerProductos ={
  listaProductos: async (req, res ) => {
    try {
      const todosProductos = await productosDAO.getAll()
      res.json (todosProductos)
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  },
  
  getProductById: async (req, res) => {
    try {
      const prodId = req.params.id
      const productoEncontrado = await productosDAO.getById(prodId)

      if (!productoEncontrado) {
        res.send({ error: 'Producto no encontrado' })
      } else {
        res.json(productoEncontrado)
      }
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  },

  addNuevoProducto: async (req, res) => {
   
    try {
      const todosProductos = await productosDAO.getAll()
      const noImage =
        'https://cdn4.iconfinder.com/data/icons/basic-ui-element-flat-style/512/Basic_UI_Elements_-_2.3_-_Flat_Style_-_36-02-64.png'
      

        const isValidURL = (imageURL) => {
          let url
          try {
            url = new URL(imageURL)
          } catch (_) {
            return false
          }
          return url.protocol === 'http:' || url.protocol === 'https:'
        }

        const getNuevoId = () => {
          let ultimoID = 0
          if (todosProductos.length) {
            ultimoID = todosProductos[todosProductos.length - 1].id
          }
          return ultimoID + 1
        }
  
        const nuevoProducto = {
        id: getNuevoId(),
        nombre: req.body.nombre ? req.body.nombre : 'No name',
        descripcion: req.body.descripcion ? req.body.descripcion : 'No description',
        foto_url: isValidURL(req.body.foto_url) ? req.body.foto_url : noImage,
        precio: producto.precio ? producto.precio : 0,
        stock: req.body.stock ? req.body.stock : 0,
      }
  
      await productosDAO.add(nuevoProducto)
      res.json(nuevoProducto)
  
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  },

  actualizarProducto: async (req, res) => {
    try {
      const prodId = req.params.id
      const productoEncontrado = await productosDAO.getById(prodId)

      if (!productoEncontrado) {
        res.send({ error: 'Producto no encontrado' })
      } else {
        const productoActualizado = {
          id: productoEncontrado.id,
          nombre: req.body.nombre ? req.body.nombre : productoEncontrado.nombre,
          descripcion: req.body.descripcion ? req.body.descripcion : productoEncontrado.descripcion,
          foto_url: req.body.foto_url ? req.body.foto_url : productoEncontrado.foto_url,
          precio: req.body.precio ? req.body.precio : productoEncontrado.precio,
          stock: req.body.stock ? req.body.stock : productoEncontrado.stock,
        }

        await productosDAO.editById(productoActualizado)

        res.json(productoActualizado)
      }
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  },

  eliminarProducto: async (req, res) => {
    try {
      const prodId = req.params.id
      const respuesta = await productosDAO.deleteById(prodId)

      if (!respuesta) {
        res.send(`El producto con ID ${prodId} no existe.`)
      } else {
        res.send(`El producto con ID ${prodId} fue removido.`)
      }
    } catch (error) {
      console.log(`ERROR: ${error}`)
    }
  },
}

export default controllerProductos