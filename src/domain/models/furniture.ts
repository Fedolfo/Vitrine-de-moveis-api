export interface EnviromentsModel {
  kitchen?: boolean
  bedroom?: boolean
  bathroom?: boolean
  livingRoom?: boolean
  office?: boolean
}

export interface FurnitureModel {
  _id: string
  name: string
  imagem: string
  price: string
  environments: EnviromentsModel
}
