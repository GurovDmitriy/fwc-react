"use client"

import { APP_CONFIG_TESTING_SERVICE } from "@/composition/configTesting"
import { APP_ENV_SERVICE } from "@/composition/environments"
import { delay, http } from "msw"
import { Auth } from "./domains/auth"
import { Cart } from "./domains/cart"
import { Category } from "./domains/category"
import { MockDB } from "./mock-db"

export class Handlers {
  handlersInstances

  constructor(private db: MockDB) {
    const handlersClasses = [Auth, Cart, Category]

    this.handlersInstances = handlersClasses.reduce((acc: any, h: any) => {
      return [
        ...acc,
        ...new h(this.db, APP_ENV_SERVICE, APP_CONFIG_TESTING_SERVICE).handle(),
      ]
    }, [])
  }

  handlers() {
    return [
      http.all("*", async () => {
        await delay(1000)
      }),

      ...this.handlersInstances,
    ]
  }
}
