import { ServiceIdentifier } from "inversify"
import { Fetcher } from "./types"

export const TOKEN_FETCHER: ServiceIdentifier<Fetcher> = Symbol.for(
  "app.service fetcher",
)
