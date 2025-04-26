import { injectable } from "inversify"
import { ErrorSchemaBase } from "./ErrorSchemaBase"
import type { ErrorFactory, ErrorSchema, ErrorSchemaParams } from "./types"

@injectable()
export class ErrorSchemaBaseFactory
  implements ErrorFactory<ErrorSchemaParams, ErrorSchema>
{
  create(params: ErrorSchemaParams): ErrorSchema {
    return new ErrorSchemaBase(params)
  }
}
