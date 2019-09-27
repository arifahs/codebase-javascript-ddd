class Agenda {
  /**
   * 
   * @param {Class} Agenda is agenda lib
   * @param {String} mongoUri is mongo url
   */
  constructor(Agenda, mongoUri){
    this.mongoUri = mongoUri
    this.Agenda = Agenda
    this.agenda = null
  }

  async init(){
    const opts = {
      autoReconnect: true,
      reconnectTries: 50,
      reconnectInterval: 1000,
      useNewUrlParser: true,
    }

    this.agenda = new this.Agenda({db: {
      address: this.mongoUri,
      options: opts
    }})

    this.agenda.start()
  }

  myAgenda(){
    if(this.agenda === null){
      throw new Error('Agenda is not initialized')
    }

    return this.agenda
  }
}

export default Agenda