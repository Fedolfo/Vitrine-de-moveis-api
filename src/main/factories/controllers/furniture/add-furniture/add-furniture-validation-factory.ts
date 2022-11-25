import { EnviromentsModel } from '@/domain/models/furniture'
import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'
import { ValidItensInAnArray } from '@/validation/validators/valid-itens-in-an-array'
import { ValidationComposite } from '@/validation/validators/validation-composite'

export const makeAddFurnitureValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['name', 'imagem', 'price', 'environments']) {
    validations.push(new RequiredFieldValidation(field))
  }

  const ENVIRONMENTS = Object.values(EnviromentsModel)

  validations.push(new ValidItensInAnArray('environments', ENVIRONMENTS))

  return new ValidationComposite(validations)
}
