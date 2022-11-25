import { EnviromentsModel } from '@/domain/models/furniture'
import { MongoHelper } from '@/infra/helpers/mongo-helper'
import { Collection } from 'mongodb'
import FurnitureMongoRepository from './furniture-mongo-repository'

let furnitureCollection: Collection

describe('Furniture Mongo Repository', () => {
  const makeEnvironments = (): EnviromentsModel[] => {
    return Object.values(EnviromentsModel)
  }

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    furnitureCollection = await MongoHelper.getCollection('furnitures')
    await furnitureCollection.deleteMany({})
  })

  const makeSut = (): FurnitureMongoRepository => {
    return new FurnitureMongoRepository()
  }

  describe('add()', () => {
    it('Should return an furniture on add success', async () => {
      const sut = makeSut()
      const furniture = await sut.add({
        name: 'Balcão',
        imagem: 'any_imagem',
        price: '200,00',
        environments: makeEnvironments()
      })
      expect(furniture).toBeTruthy()
    })
  })
})
