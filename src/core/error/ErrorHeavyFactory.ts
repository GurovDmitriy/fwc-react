import { injectable } from "inversify"
import { ErrorHeavy } from "./ErrorHeavy"
import type { ErrorFactory, ErrorParams } from "./types"

@injectable()
export class ErrorHeavyFactory
  implements ErrorFactory<ErrorParams, ErrorHeavy>
{
  create(params: ErrorParams): ErrorHeavy {
    return new ErrorHeavy(params)
  }
}
