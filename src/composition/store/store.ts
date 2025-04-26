import { AuthStore } from "@/domains/auth/auth.store"
import { configureStore } from "@reduxjs/toolkit"
import { injectable } from "inversify"

@injectable()
export class Store {
  makeStore

  private authStore: AuthStore

  constructor(authStore: AuthStore) {
    this.authStore = authStore

    this.makeStore = () => {
      return configureStore({
        reducer: {
          auth: this.authStore.reducer,
        },
      })
    }
  }
}
