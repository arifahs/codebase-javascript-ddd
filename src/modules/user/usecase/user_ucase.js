import _error from "../../../utils/error"

class usersUsecase {
  constructor(params) {
    this.userRepository = params.layer.repo.userRepository
  }

  async fetch() {
    return this.userRepository.fetch()
  }

  async makeError() {
    throw new _error.New(
      _error.message.duplicate,
      {
        foo: "some detail"
      }
    )
  }

}

export default usersUsecase
