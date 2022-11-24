import { EnviromentsModel, FurnitureModel } from '@/domain/models/furniture'

export interface AddFurnitureParams {
  name: string
  imagem: string
  price: string
  environments: EnviromentsModel
}

export interface AddFurniture {
  add: (furniture: AddFurnitureParams) => Promise<FurnitureModel>
}
