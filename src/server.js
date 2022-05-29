import express from 'express'
import {carritoRouter} from './routers/carritoRouter.js'
import {mainRouter} from './routers/mainRouter.js'
import {productosRouter} from './routers/productosRouter.js'


const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.use('/api', mainRouter)
app.use('/api/productos', productosRouter)
app.use('/api/carrito', carritoRouter)

app.all('*', (req, res) => {
    res.status(404).json({
      error: -2,
      description: `Route '${req.originalUrl}' method '${req.method}' not implemented.`,
    })
  })
  
  

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))


