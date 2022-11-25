import { EnviromentsModel } from '@/domain/models/furniture'
import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'
import { ValidItensInAnArray } from '@/validation/validators/valid-itens-in-an-array'
import { ValidationComposite } from '@/validation/validators/validation-composite'
import { Validation } from '../../../../../presentation/protocols/validation'
import { makeAddFurnitureValidation } from './add-furniture-validation-factory'

jest.mock('../../../../../validation/validators/validation-composite')

describe('Add Furniture Validation Factory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeAddFurnitureValidation()
    const validations: Validation[] = []

    for (const field of ['name', 'imagem', 'price', 'environments']) {
      validations.push(new RequiredFieldValidation(field))
    }

    const ENVIRONMENTS = Object.values(EnviromentsModel)

    validations.push(new ValidItensInAnArray('environments', ENVIRONMENTS))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
