export class RequiredMissingItemsInArray extends Error {
  constructor(message: string, values: string) {
    super()
    this.name = `This value is not valid: ${message}, values that are valid: ${values}`
  }
}
