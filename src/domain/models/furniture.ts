export interface EnviromentsModel {
  kitchen?: string
  bedroom?: string
  bathroom?: string
  livingRoom?: string
  office?: string
}

export interface FurnitureModel {
  _id: string
  name: string
  imagem: string
  price: string
  environments: EnviromentsModel
}
