import type { AppStorage } from "@/core/storage/types"
import { ServiceIdentifier } from "inversify"

export const APP_STORAGE_TOKEN: ServiceIdentifier<AppStorage> = Symbol.for(
  "app.service AppStorage",
)
