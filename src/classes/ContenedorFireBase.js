import admin from "firebase-admin"
import fs from 'fs'


const serviceAccount =JSON.parse (fs.readFileSync("DB/proyectobackendfirebase-firebase-adminsdk-4qy28-c45c668a90.json", 'utf8'))

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:"https://proyectobackendfirebase-firebaseio.com"

})

const db = admin.firestore();

class ContenedorFirebase {

    constructor(nombreColeccion) {
        this.coleccion = db.collection(nombreColeccion)
    }

    async readFile() {
        try {
          return JSON.parse(await fs.promises.readFile(`DB/${this.archivo}.json`, 'utf-8'))
        } catch (error) {
          throw new Error(`Leyendo error: ${error}`)
        }
      }
    
      async writeFile(data) {
        try {
          fs.promises.writeFile(`DB/${this.archivo}.json`, JSON.stringify(data), 'utf-8')
        } catch (error) {
          throw new Error(`Escribiendo error: ${error}`)
        }
      }
    
    
      async getAll() {
        try {
            const todosItems = await this.readFile()
            return todosItems
    
        } catch (error) {
          await this.writeFile([])
          const todosItems = await this.readFile()
        
          return todosItems
        }
      }
      async getById(id) {
        try {
          const todosItems = await this.readFile()
          const encontrarItem = todosItems.find((e) => e.id === Number(id))
          return encontrarItem
    
        } catch (error) {
          console.log(`ERROR: ${error}`)
        }
      }
    
      async add(objeto) {
        try {
          const todosItems = await this.readFile()
          todosItems.push(objeto)
    
          await this.writeFile(todosItems)
            
        } catch (error) {
          console.log(`ERROR: ${error}`)
        }
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
        try {
          const todosItems = await this.readFile()
        
          const filtrarItemLista = todosItems.filter((e) => e.id !== Number(id))
    
          if (JSON.stringify(todosItems) === JSON.stringify(filtrarItemLista)) {
            return false
          } else {
            await this.writeFile(filtrarItemLista)
    
            return true
          }
        } catch (error) {
          console.log(`ERROR: ${error}`)
        }
      }
    
    
      async deleteAll() {
        try {
          await this.writeFile([])
        } catch (error) {
          console.log(`ERROR: ${error}`)
        }
      }
    
      async addItem(contenedorId, objecto) {
        try {
          let todosItems = await this.readFile()
          let itemEncontrado = todosItems.find((e) => e.id === Number(contenedorId))
          itemEncontrado.productos.push(objecto)
    
          todosItems = todosItems.map((e) => (e.id !== itemEncontrado.id ? e : itemEncontrado))
    
          await this.writeFile(todosItems)
        
        } catch (error) {
          console.log(`ERROR: ${error}`)
        }
      }
    
      async removeItem(contenedorId, objectoId) {
        try {
          let todosItems = await this.readFile()
          let itemEncontrado = todosItems.find((e) => e.id === Number(contenedorId))
          itemEncontrado.productos = itemEncontrado.productos.filter((e) => e.id !== Number(objectoId))
    
    
          todosItems = todosItems.map((e) => (e.id !== itemEncontrado.id ? e : itemEncontrado))
    
          await this.writeFile(todosItems)
            
        } catch (error) {
          console.log(`ERROR: ${error}`)
        }
      }
    
      async emptyContenedor(contenedorId) {
        try {
          let todosItems = await this.readFile()
          
    
          let itemEncontrado = todosItems.find((e) => e.id === Number(contenedorId))
          itemEncontrado.productos = []
    
          todosItems = todosItems.map((e) => (e.id !== itemEncontrado.id ? e : itemEncontrado))
    
          await this.writeFile(todosItems)
            
      
        } catch (error) {
          console.log(`ERROR: ${error}`)
        }
      }
    async borrarAll() {
        // version fea e ineficiente pero entendible para empezar
        try {
            const docs = await this.listarAll()
            const ids = docs.map(d => d.id)
            const promesas = ids.map(id => this.borrar(id))
            const resultados = await Promise.allSettled(promesas)
            const errores = resultados.filter(r => r.status == 'rejected')
            if (errores.length > 0) {
                throw new Error('no se borró todo. volver a intentarlo')
            }
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    async desconectar() {
    }
}

export default ContenedorFirebase