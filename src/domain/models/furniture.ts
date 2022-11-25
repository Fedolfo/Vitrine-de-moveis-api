export enum EnviromentsModel {
  kitchen = 'kitchen',
  bedroom = 'bedroom',
  bathroom = 'bathroom',
  livingRoom = 'livingRoom',
  office = 'office',
}

export interface FurnitureModel {
  _id: string
  name: string
  imagem: string
  price: string
  environments: EnviromentsModel[]
}
