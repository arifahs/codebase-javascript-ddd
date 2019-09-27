import jwt from 'jsonwebtoken'
import error from './error'

/**
 *
 * @param {Object | Any } data is data to encode to jwt
 */
const sign = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: '5d',
  })
}

/**
 *
 * @param {String} authorization is authorization bearer, exmpl: Bearer <token>
 */
const verifyToken = (authorization) => {
  return new Promise(async (resolve, reject) => {
    const bearerHeader = authorization
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ')
      jwt.verify(bearer[1], process.env.JWT_SECRET, (err, decoded) => {
        if (err) reject(new Error(error.message.unauthorizedInvalidToken))
        resolve(decoded)
      })
    } else {
      reject(new Error(error.message.unauthorizedAuthorizationMissing))
    }
  })
}

export default {
  sign,
  verifyToken,
}
