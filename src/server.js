import express from 'express'
import {carritoRouter} from './routers/carritoRouter'
import {mainRouter} from './routers/mainRouter'
import {productosRouter} from './routers/productosRouter'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.use('/api', mainRouter)
app.use('/api/productos', productosRouter)
app.use('/api/carrito', carritoRouter)


export default app