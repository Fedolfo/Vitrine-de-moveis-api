import { RequiredMissingItemsInArray } from '@/presentation/errors/required-missing-items-in-array'
import { Validation } from '@/presentation/protocols'

export class ValidItensInAnArray implements Validation {
  constructor(private readonly fieldName: string, private readonly arrayItens: string[]) {}

  validate (input: any): Error | null {
    const environments = input[this.fieldName]
    if (environments) {
      for (const item of environments) {
        if (!this.arrayItens.includes(item)) {
          return new RequiredMissingItemsInArray(item, environments)
        }
      }
    }
    return null
  };
}
