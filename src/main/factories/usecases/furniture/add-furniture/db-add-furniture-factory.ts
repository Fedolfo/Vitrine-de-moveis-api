import { DbAddFurniture } from '@/data/usecases/furniture/db-add-furniture'
import { AddFurniture } from '@/domain/usecases/furniture/add-furniture'
import FurnitureMongoRepository from '@/infra/db/furniture/furniture-mongo-repository'

const makeDbAddFurniture = (): AddFurniture => {
  const furnitureMongoRepository = new FurnitureMongoRepository()
  const dbAddFurniture = new DbAddFurniture(furnitureMongoRepository)
  return dbAddFurniture
}

export default makeDbAddFurniture
