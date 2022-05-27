import fs  from 'fs'

class ContenedorArchivo {
  constructor(archivo) {
    this.archivo = archivo
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
}



export default ContenedorArchivo
