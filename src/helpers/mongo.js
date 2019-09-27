class Mongo {
  /**
   *
   * @param {Object} mongoose is mongoose lib
   * @param {String} mongoUri is mongo url
   */
  constructor(mongoose, mongoUri) {
    this.mongoose = mongoose
    this.mongoUri = mongoUri
    this.connection = null
  }

  async init() {
    return new Promise((resolve, reject) => {
      this.mongoose.set('useCreateIndex', true)

      const opts = {
        autoReconnect: true,
        reconnectTries: 50,
        reconnectInterval: 1000,
        useNewUrlParser: true,
      }

      this.mongoose.connect(this.mongoUri, opts)
      this.connection = this.mongoose.connection

      this.connection.on('error', function(e) {
        reject(e)
      })

      this.connection.once('open', function() {
        resolve(`MongoDB successfully connected`)
      })
    })
  }

  stop() {
    this.connection.close()
  }

  /**
   * @param {String} collectionName
   */
  async cleanUp(collectionName) {
    if (process.env.NODE_ENV === 'test') {
      this.connection.collection(collectionName).deleteMany({})
    }
  }
}

export default Mongo
