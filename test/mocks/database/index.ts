export const inMemoryMockDatabase: any = {}

export const MockAppDataSource = {
  initialize: () => Promise.resolve(),
  getRepository: (entity: any): any => {
    return createRepository(entity)
  },
}

const createRepository = (entity: any) => {
  return {
    create: (object: any) => {
      object.updated_at = new Date()
      return object
    },
    save: (object: Object) => {
      if (inMemoryMockDatabase[entity]) {
        inMemoryMockDatabase[entity] = [...inMemoryMockDatabase[entity], object]
      } else {
        inMemoryMockDatabase[entity] = [object]
      }
      return object
    },
    update: (condition: any, object: Object) => {
      const keyCondition = Object.keys(condition)[0]
      const elementToUpdate = inMemoryMockDatabase[entity].find((el: any) => el[keyCondition] === condition)

      if (!elementToUpdate) return

      return Object.assign(elementToUpdate, object)
    },
    findOne: ({ where }: any) => {
      const keyCondition = Object.keys(where)[0]

      if (!inMemoryMockDatabase[entity] || !inMemoryMockDatabase[entity].length) return null

      return inMemoryMockDatabase[entity].find((el: any) => el[keyCondition] === where[keyCondition])
    },
  }
}
