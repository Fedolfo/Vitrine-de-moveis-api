import makeDbAddFurniture from '@/main/factories/usecases/furniture/add-furniture/db-add-furniture-factory'
import AddFurnitureController from '@/presentation/controllers/furniture/add-furniture/add-furniture-controller'
import { Controller } from '@/presentation/protocols'
import { makeAddFurnitureValidation } from './add-furniture-validation-factory'

export const makeAddFurnitureController = (): Controller => {
  return new AddFurnitureController(makeDbAddFurniture(), makeAddFurnitureValidation())
}
