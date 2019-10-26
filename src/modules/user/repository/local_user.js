class localUserRepository {
  constructor() {

  }

  async fetch() {
    const users = [
      {
        name: 'hafiz',
      },
      {
        name: 'jondes',
      },
      {
        name: 'syafie',
      },
      {
        name: 'Amin',
      },
      {
        name: 'udin', // this is my change
      },
      {
        name: 'Dicky', // this is my change
      },
    ]

    return users
  }
}

export default localUserRepository
