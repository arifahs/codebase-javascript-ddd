import validation, {rules} from '../../../utils/validation'

const createUser = (data) => {
  const schema = {
    name: rules.name.required(),
  }
  return validation(schema, data)
}

export default {
  createUser,
}
