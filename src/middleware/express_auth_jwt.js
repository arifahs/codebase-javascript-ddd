import jwt from '../utils/jwt'
import error from '../utils/error'

/**
 * @param {[]String} roles is user level
 */
export default (roles = ['user']) => {
  return async (req, _, next) => {
    try {
      const result = await jwt.verifyToken(req.headers['authorization'])
      const state = result.data.roleId.state
      if (!roles.includes(state)) {
        throw new Error(error.message.unauthorized)
      }

      req.jwtData = result.data
      next()
    } catch (e) {
      throw (e)
    }
  }
}
