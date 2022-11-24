import { FurnitureModel } from '@/domain/models/furniture'
import { AddFurnitureParams } from '@/domain/usecases/furniture/add-furniture'

export interface AddFurnitureRepository {
  add: (furniture: AddFurnitureParams) => Promise<FurnitureModel>
}
