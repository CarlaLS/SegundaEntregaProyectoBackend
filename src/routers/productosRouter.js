
import { Router } from 'express'
import controllerProductos from '../Controllers/controllerProductos'
import auth from '../Middlewares/auth'
const router = new Router()



router.get('/', controllerProductos.listaProductos)


router.get('/:id', controllerProductos.getProductById)

// Agregar
router.post('/', auth.adminAuth, controllerProductos.addNuevoProducto)

// Editar
router.put('/:id',  auth.adminAuth, controllerProductos.actualizarProducto)

// Borrar
router.delete('/:id', auth.adminAuth, controllerProductos.eliminarProducto)


export default router