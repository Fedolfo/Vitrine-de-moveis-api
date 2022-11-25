import { MongoHelper as sut } from './mongo-helper'

describe('Mongo Helper', () => {
  beforeAll(async() => {
    await sut.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  it('Should reconnect if mongodb is down', async () => {
    let furnituresCollection = await sut.getCollection('furnitures')
    expect(furnituresCollection).toBeTruthy()
    await sut.disconnect()
    furnituresCollection = await sut.getCollection('furnitures')
    expect(furnituresCollection).toBeTruthy()
  })
})
