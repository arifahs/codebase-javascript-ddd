class localUserRepository {
  constructor() {
    
  }

  async fetch() {
    const users = [
      {
        name: "hafiz"
      },
      {
        name: "jondes"
      },
      {
        name: "syafie"
      }
    ]

    return users
  }

}

export default localUserRepository
