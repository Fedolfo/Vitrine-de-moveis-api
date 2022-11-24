import { AddFurnitureRepository } from '@/data/protocols/db/furniture/add-furniture-repository'
import { FurnitureModel } from '@/domain/models/furniture'
import { AddFurnitureParams } from '@/domain/usecases/furniture/add-furniture'
import { MongoHelper } from '@/infra/helpers/mongo-helper'

class FurnitureMongoRepository implements AddFurnitureRepository {
  async add (furniture: AddFurnitureParams): Promise<FurnitureModel> {
    const furnitureCollection = await MongoHelper.getCollection('furnitures')
    const result = furnitureCollection.insertOne(furniture)
    return result as unknown as FurnitureModel
  }
}

export default FurnitureMongoRepository
