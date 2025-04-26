import { createStorage } from "unstorage"

export interface AppStorage {
  instance: ReturnType<typeof createStorage>
}
