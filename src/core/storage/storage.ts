"use client"

import { injectable } from "inversify"
import { createStorage } from "unstorage"
import localStorageDriver from "unstorage/drivers/localstorage"
import memoryDriver from "unstorage/drivers/memory"
import type { AppStorage } from "./types"

@injectable()
export class StorageBase implements AppStorage {
  private readonly _instance: ReturnType<typeof createStorage>

  constructor() {
    if (typeof window !== "undefined" && window.localStorage) {
      this._instance = createStorage({
        driver: localStorageDriver({
          base: "app:",
        }),
      })
    } else {
      this._instance = createStorage({
        driver: memoryDriver(),
      })
    }
  }

  get instance() {
    return this._instance
  }
}
