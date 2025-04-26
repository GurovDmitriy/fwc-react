import { injectable } from "inversify"
import { ErrorMappedBase } from "./ErrorMappedBase"
import type { ErrorFactory, ErrorMapped, ErrorMappedParams } from "./types"

@injectable()
export class ErrorMappedBaseFactory
  implements ErrorFactory<ErrorMappedParams, ErrorMapped>
{
  create(params: ErrorMappedParams): ErrorMapped {
    return new ErrorMappedBase(params)
  }
}
