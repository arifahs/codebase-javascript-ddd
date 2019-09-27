import 'dotenv/config'
import _express from 'express'
import bodyParser from 'body-parser'
import {hashElement} from 'folder-hash'
import logger from './utils/logger'
import _gqlServer from './middleware/gql_server'
import hashOptions from './utils/hash_options'

// repository
import UserRepository from './modules/user/repository/local_user'

// usecase
import UserUsecase from './modules/user/usecase/user_ucase'

// delivery http rest
import UserHttpRestHandler from './modules/user/delivery/http/rest/user_rest_handler'

class Main {
  constructor() {
    this.main()
  }

  async initBefore() {
    try {
      //some init before
    } catch (e) {
      logger('error', 'main-initBefore', 'error init before', e)
      process.exit()
    }
  }

  async main() {
    try {
      //initBefore
      await this.initBefore()

      const currentHash = await hashElement('./src', hashOptions)
      const express = _express()
      express.use(bodyParser.json())
      express.use(bodyParser.urlencoded({
        extended: true,
      }))

      // repository
      const userRepository = new UserRepository()

      // usecase
      const userUsecase = new UserUsecase({
        layer: { 
          repo: { userRepository },
          ucase: {},
          delivery: {}
        },
        dep: {},
        data: {}
      })
  
      // delivery rest http
      new UserHttpRestHandler({
        layer: { 
          repo: {},
          ucase: { userUsecase },
          delivery: {}
        },
        dep: { express },
        data: {}
      })

      //initAfter
      await this.initAfter()

      // start/listen express server
      express.get('/', (_, res) => {
        res.send(`This service is running properly, developed by Arifahs X Aminudin. hash: [${currentHash.hash}]`)
      })
      express.listen(process.env.PORT, () => logger('info', 'main-main', `app listening on port ${process.env.PORT}!`))
    } catch (e) {
      logger('error', 'main-main', 'error main', e)
      process.exit()
    }
  }

  async initAfter(){
    try {
      //some init after
    } catch (e) {
      logger('error', 'main-initAfter', 'error init after', e)
      process.exit()
    }
  }
}

new Main()
