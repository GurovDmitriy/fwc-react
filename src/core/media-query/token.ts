import { ServiceIdentifier } from "inversify"
import type { MediaQuery } from "./types"

export const TOKEN_MEDIA_QUERY: ServiceIdentifier<MediaQuery> = Symbol.for(
  "app.service media-query",
)
