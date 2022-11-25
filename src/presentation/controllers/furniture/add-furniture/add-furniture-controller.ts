import { AddFurniture } from '@/domain/usecases/furniture/add-furniture'
import { badRequest, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'

class AddFurnitureController implements Controller {
  constructor(private readonly addFurniture: AddFurniture, private readonly validation: Validation) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const {
        name,
        imagem,
        price,
        environments
      } = httpRequest.body

      const error = this.validation.validate(httpRequest.body)

      if (error) {
        return badRequest(error)
      }

      const furniture = await this.addFurniture.add({
        name,
        imagem,
        price,
        environments
      })
      return ok(furniture)
    } catch (error: unknown) {
      return serverError(error as Error)
    }
  }
}

export default AddFurnitureController
