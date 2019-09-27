import {Router as router} from 'express'
import logger from '../../../../../utils/logger'
import error from '../../../../../utils/error'
import wrapper from '../../../../../utils/wrapper'

class UserRestHandler {
  constructor(params) {
    const e = params.dep.express
    this.userUsecase = params.layer.ucase.userUsecase

    const user = router()

    user.get('/', this.fetch.bind(this))
    user.get('/error', this.makeError.bind(this))

    e.use('/api/v1/users', user)
  }

  async fetch(_, res) {
    try {
      const users = await this.userUsecase.fetch()
      res.json(wrapper.responseRest(users))
    } catch (e) {
      logger('error', 'user-rest-fetch', e.message, e)
      res.status(error.getStatusCode(e.message)).json(wrapper.responseRest({}, e.message, e))
    }
  }

  async makeError(_, res) {
    try {
      await this.userUsecase.makeError()
      // res.json(wrapper.responseRest(users))
    } catch (e) {
      logger('error', 'user-rest-fetch', e.message, e)
      res.status(error.getStatusCode(e.message)).json(wrapper.responseRest({}, e.message, e))
    }
  }
}

export default UserRestHandler
