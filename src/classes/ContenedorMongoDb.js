
import mongoose from 'mongoose'
import config from '../config.js'

try {
  await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options, () =>
    console.log('Mongoose conectado')
  )
} catch (error) {
  console.log('Mongoose no conectado.')
}
const dbConnection = mongoose.connection
dbConnection.on('error', (error) => console.log(`Connection error: ${error}`))
dbConnection.once('open', () => console.log('Connectedo a  DB!'))



class ContenedorMongoDb {
  constructor(collectionName, schema) {
    this.collection = mongoose.model(collectionName, schema)
  }

  async getAll() {
    try {
      const todosItems = await this.collection.find({})
      return todosItems
    } catch (error) {
      throw new Error(`Error: ${error}`)
    }
  }

  async getById(id) {
    try {
      const encontrarItem = await this.collection.find({ id: Number(id) })
      return encontrarItem
    } catch (error) {
      throw new Error(`Error: ${error}`)
    }
  }

  async addItem(object) {
    try {
      await this.collection.create(object)
    } catch (error) {
      throw new Error(`Error: ${error}`)
    }
  }

  async editById(object, id) {
    try {
      await this.collection.updateOne(
        {
          id: id,
        },
        { $set: object }
      )
    } catch (error) {
      throw new Error(`Error: ${error}`)
    }
  }

  async deleteById(id) {
    try {
      const encontrarItem = await this.collection.find({ id: Number(id) })
      if (encontrarItem && encontrarItem.length) {
        await this.collection.deleteOne({
          id: id,
        })
        return true
      } else {
        return false
      }
    } catch (error) {
      throw new Error(`Error: ${error}`)
    }
  }

  async deleteAll() {
    try {
      await this.collection.deleteMany({})
    } catch (error) {
      throw new Error(`Error: ${error}`)
    }
  }

  async addItemInto(containerId, object) {
    try {
      await this.collection.updateOne({ id: containerId }, { $push: { productos: object[0] } })
    } catch (error) {
      throw new Error(`Error: ${error}`)
    }
  }

  async removeItemFrom(containerId, objectId) {
    try {
      await this.collection.updateOne(
        { id: containerId },
        {
          $pull: {
            productos: { id: objectId },
          },
        }
      )
    } catch (error) {
      throw new Error(`Error: ${error}`)
    }
  }

  async emptyContainer(containerId) {
    try {
      await this.collection.updateOne(
        { id: containerId },
        {
          $pullAll: {
            productos: [{}],
          },
        }
      )
    } catch (error) {
      throw new Error(`Error: ${error}`)
    }
  }
}


export default ContenedorMongoDb