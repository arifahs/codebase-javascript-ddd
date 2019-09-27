import * as yup from 'yup'
import rules from './validation_rules'
import error from './error'

/**
 *
 * @param {Object} data is data to validate
 * @param {Object} schemaRule schema object
 */
const isValid = (data, schemaRule) => {
  return new Promise( async (resolve, reject) => {
    await yup.object()
        .shape(schemaRule)
        .validate(data, {abortEarly: false})
        .catch((err) => {
          reject(new error.New(error.message.invalidValidationError, {validation: _buildErrorObject(err.inner)}))
        })
    resolve(true)
  })
}

/**
 * @param {Error} details is details error from yup
 */
const _buildErrorObject = (errs) => {
  const res = {}
  errs.map((err) => {
    res[err.path] = err.message
  })
  return res
}

export {
  rules,
}

export default (schema, data) => {
  return isValid(data, schema)
}
