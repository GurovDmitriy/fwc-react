import { ServiceIdentifier } from "inversify"
import type { ErrorMapper, ErrorService } from "./types"

export const TOKEN_ERROR_SERVICE: ServiceIdentifier<ErrorService> = Symbol.for(
  "app.service ErrorService",
)
export const TOKEN_ERROR_MAPPER: ServiceIdentifier<ErrorMapper> = Symbol.for(
  "app.service ErrorMapper",
)
