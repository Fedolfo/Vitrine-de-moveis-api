import { AddFurnitureRepository } from '@/data/protocols/db/furniture/add-furniture-repository'
import { FurnitureModel } from '@/domain/models/furniture'
import { AddFurniture, AddFurnitureParams } from '@/domain/usecases/furniture/add-furniture'

export class DbAddFurniture implements AddFurniture {
  constructor(private readonly addFurnitureRepository: AddFurnitureRepository) {}

  async add (furniture: AddFurnitureParams): Promise<FurnitureModel> {
    return await this.addFurnitureRepository.add(furniture)
  }
}
