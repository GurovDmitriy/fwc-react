import { injectable } from "inversify"
import { ErrorBase } from "./ErrorBase"
import type { ErrorFactory, ErrorParams } from "./types"

@injectable()
export class ErrorBaseFactory implements ErrorFactory<ErrorParams, ErrorBase> {
  create(params: ErrorParams): ErrorBase {
    return new ErrorBase(params)
  }
}
