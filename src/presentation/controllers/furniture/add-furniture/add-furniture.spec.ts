import { FurnitureModel } from '@/domain/models/furniture'
import { AddFurniture, AddFurnitureParams } from '@/domain/usecases/furniture/add-furniture'
import { MissingParamError, ServerError } from '@/presentation/errors'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { HttpRequest, Validation } from '@/presentation/protocols'
import AddFurnitureController from './add-furniture-controller'

const makeFakeFurniture = (): FurnitureModel => ({
  _id: 'valid_id',
  name: 'Balcão',
  imagem: 'any_imagem',
  price: '200,00',
  environments: {
    kitchen: 'any_value',
    bathroom: 'any_value',
    bedroom: 'any_value',
    livingRoom: 'any_value',
    office: 'any_value'
  }
})

const makeFakeRequest = (): HttpRequest => ({
  body: {
    name: 'Balcão',
    imagem: 'any_imagem',
    price: '200,00',
    environments: {
      kitchen: 'any_value',
      bathroom: 'any_value',
      bedroom: 'any_value',
      livingRoom: 'any_value',
      office: 'any_value'
    }
  }
})

const makeAddFurniture = (): AddFurniture => {
  class AddFurnitureStub implements AddFurniture {
    async add (furniture: AddFurnitureParams): Promise<FurnitureModel> {
      return await new Promise(resolve => resolve(makeFakeFurniture()))
    };
  }
  return new AddFurnitureStub()
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate(input: any): Error | null {
      return null
    }
  }
  return new ValidationStub()
}

interface SutTypes {
  sut: AddFurnitureController
  addFurnitureStub: AddFurniture
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const addFurnitureStub = makeAddFurniture()
  const validationStub = makeValidation()
  const sut = new AddFurnitureController(addFurnitureStub, validationStub)
  return {
    sut,
    addFurnitureStub,
    validationStub
  }
}

describe('AddFurniture Controller', () => {
  test('Should call AddFurniture with correct values', async () => {
    const { sut, addFurnitureStub } = makeSut()

    const addSpy = jest.spyOn(addFurnitureStub, 'add')

    await sut.handle(makeFakeRequest())
    expect(addSpy).toHaveBeenCalledWith(makeFakeRequest().body)
  })

  test('Should return 500 if addFurniture throws', async () => {
    const { sut, addFurnitureStub } = makeSut()

    jest.spyOn(addFurnitureStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => reject(new Error()))
    })

    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(new Error().stack as string)))
  })

  test('Should return 200 if in valid data is provided', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok({
      _id: 'valid_id',
      name: 'Balcão',
      imagem: 'any_imagem',
      price: '200,00',
      environments: {
        kitchen: 'any_value',
        bathroom: 'any_value',
        bedroom: 'any_value',
        livingRoom: 'any_value',
        office: 'any_value'
      }
    }))
  })

  test('Should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()

    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()

    await sut.handle(httpRequest)

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()

    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(badRequest((new MissingParamError('any_field'))))
  })
})
