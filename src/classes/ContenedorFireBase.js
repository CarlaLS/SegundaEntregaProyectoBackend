import admin from "firebase-admin"
import config from '../../config.js'




admin.initializeApp({
    credential: admin.credential.cert(config.firestore),
    

})



class ContenedorFirebase {

    constructor(collection, config) {
        (this.config = config), (this.db=admin.firestore()), (this.collection=this.db.collection(collection))
    }

        
      async getAll() {
      
            const snapshot = await this.collection.get()
            const show = [];
            snapshot.forEach((doc)=> show.push ({id: doc.id, ...doc.data()}));
            return show;
    
        } 
      
      async getById(id) {
      
          const elementos = await this.getAll()
          const elemento = elementos.find((e) => e.id === Number(id))
          return elemento
    
        

      }
    
      async editById(objeto) {
        try {
          let todosItems = await this.readFile()
          todosItems = todosItems.map((e) => (e.id !== objeto.id ? e : objeto))
    
          await this.writeFile(todosItems)
        } catch (error) {
          console.log(`ERROR: ${error}`)
        }
      }
    
      async deleteById(id) {
        
          const Delete = await this.getById()
        
    
          if (Delete) {
            await this.collection.doc(id).delete()
            return true
          } else  return false
          }
       
      
  
      async deleteAll() {
        
        const elementos=  await this.getAll();
        elementos.forEach((e) => this.deleteById(e.id))
        }
      
      async addNewCarrito() {
          await this.collection.add({ productos: [] });
        }


      async addItem(id, idProducto) {
          const db=admin.firestore()
          const coleccionProductos = db.collection('productos')
          const snapshot = await coleccionProductos.get();
          const todosProductos= [];
          snapshot.forEach((doc)=> todosProductos.push ({id: doc.id, ...doc.data()}));
    
          const productosAgregar = todosProductos.find((prod) => prod.id == idProducto)
          if(!productosAgregar) return 'No se encuentra el producto a agregar'

          const carrito = await this.getById(id);
          if(!carrito) return 'No se encuenta el carrito'
      
          carrito.productos.push(productosAgregar);
      
          this.collection.doc(id).update({ productos: [...carrito.productos] });
      
          return true
    
          
      }
      async getProductosCarrito(id){
        const carrito = await this.getById(id)
        return carrito ? carrito.productos : null
      }
      async removeItem(id, idProducto) {
        
          let productosCarrito = await this.getProductosCarrito(id)
          if(!productosCarrito) return 'No se encuentra el carrito que buscas'
          const indiceProductos = prod.findIndex((prod) => prod.id == idProducto);

          if (indiceProductos > -1) {
            productosCarrito= productosCarrito.slice(0, indiceProductos).concat(productosCarrito.slice (indiceProductos + 1))
            this.collection.doc(id).update({productos:[...productosCarrito]})
            return true
          
          
         }else if (indiceProductos ===-1) {
            return 'No se encuentra ese producto en el carrito'

        }
        }
        
      
    
      async emptyCarrito(id) {
        
          const vaciarCarrito = await this.getById(id)
          if(!vaciarCarrito)  return 'No se encuentra ese carrito';
          this.collection.doc(id).update({prdocutos:[]});
          return true
        
          
        } 
        
      }
    


export default ContenedorFirebase