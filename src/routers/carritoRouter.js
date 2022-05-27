

import{ Router }  from 'express'
import controllerCarrito from '../Controllers/controllerCarrito'
const router = new Router()



router.get('/', controllerCarrito.ListaCarrito)


router.get('/:id', controllerCarrito.getCarritoById)

router.get('/:id/productos', controllerCarrito.ListaProductoCarrito)



router.post('/', controllerCarrito.crearNuevoCarrito)

router.post('/:id/productos/:id_prod', controllerCarrito.addProductosAlCarrito)


router.delete('/:id/productos/:id_prod', controllerCarrito.eliminarProductoCarrito)

router.delete('/:id', controllerCarrito.vaciarCarrito)


export default router