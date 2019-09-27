import {SchemaDirectiveVisitor} from 'graphql-tools'
import {defaultFieldResolver} from 'graphql'
import {ApolloError} from 'apollo-server-express'
import logger from '../utils/logger'
import error from '../utils/error'
import jwt from '../utils/jwt'

/**
 * Doc about schema directive: https://www.apollographql.com/docs/graphql-tools/schema-directives/
 */
class AuthDirective extends SchemaDirectiveVisitor {
  visitObject(type) {
    this.ensureFieldsWrapped(type)
    type._requiredAuthRole = this.args.requires
  }
  visitFieldDefinition(field, details) {
    this.ensureFieldsWrapped(details.objectType)
    field._requiredAuthRole = this.args.requires
  }

  async ensureFieldsWrapped(objectType) {
    if (objectType._authFieldsWrapped) return
    objectType._authFieldsWrapped = true

    const fields = objectType.getFields()

    Object.keys(fields).forEach((fieldName) => {
      const field = fields[fieldName]
      const {resolve = defaultFieldResolver} = field
      field.resolve = async function(...args) {
        const requiredRole = field._requiredAuthRole || objectType._requiredAuthRole

        if (!requiredRole) {
          return resolve.apply(this, args)
        }

        const context = args[2]

        try {
          const authorization = context.headers['authorization']
          const result = await jwt.verifyToken(authorization)

          const state = result.roleId.state
          const requiredRoles = requiredRole.split(' ')

          if (!requiredRoles.includes(state)) {
            throw new Error(error.message.unauthorized)
          }

          return resolve.apply(this, args)
        } catch (e) {
          logger('error', 'gql-authDirective', e.message, e)
          return new ApolloError(e.message, error.getStatusCode(e.message), e)
        }
      }
    })
  }
}

export default AuthDirective
