import { ErrorBase } from "./ErrorBase"
import { ErrorSchema, ErrorSchemaParams } from "./types"

export class ErrorSchemaBase extends ErrorBase implements ErrorSchema {
  issues: any

  constructor(params: ErrorSchemaParams) {
    super(params)

    this.issues = params.issues
  }
}
