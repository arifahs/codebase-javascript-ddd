// eslint-disable-next-line switch-colon-spacing
import mongoose from 'mongoose'

/**
 * @param {Object} query is object from req.query
 */
const restParamBuilder = (query) => {
  const search = {}
  const filter = {}

  Object.keys(query).forEach((k) => {
    const [prefix, key] = k.split('_')
    if (prefix.indexOf('search') > -1) {
      search[key] = query[k]
    } else if (prefix.indexOf('filter') > -1) {
      filter[key] = query[k]
    }
  })

  return {
    search, filter,
  }
}

/**
 * @param {object} filter turn sort(string) to object
 * @param {object} def is default sort
 */
const mgoSortBuilder = (filter, def) => {
  if (filter && filter.length > 0) {
    const p = filter.split(' ')
    const result = {}
    p.forEach((s)=>{
      const key = s[0] === '-' ? s.substring(1) : s
      Object.assign(result, {[key]: s[0] !== '-' ? 1 : -1})
    })
    return result
  } else {
    return def
  }
}

const isObjectId = mongoose.Types.ObjectId.isValid

const ObjectId = mongoose.Types.ObjectId

export {
  restParamBuilder,
  mgoSortBuilder,
  isObjectId,
  ObjectId
}
