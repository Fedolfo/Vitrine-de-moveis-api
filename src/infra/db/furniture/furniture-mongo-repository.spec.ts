import { MongoHelper } from '@/infra/helpers/mongo-helper'
import { Collection } from 'mongodb'
import FurnitureMongoRepository from './furniture-mongo-repository'

let furnitureCollection: Collection

describe('Furniture Mongo Repository', () => {
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
        environments: {
          kitchen: 'any_value',
          bathroom: 'any_value',
          bedroom: 'any_value',
          livingRoom: 'any_value',
          office: 'any_value'
        }
      })
      expect(furniture).toBeTruthy()
    })
  })
})
