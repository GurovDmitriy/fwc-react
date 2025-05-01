"use client"

import { Container } from "inversify"

const container = new Container({
  autoBindInjectable: true,
  skipBaseClassChecks: true,
})

/*
  ********************
  Error
  ********************
*/
// container
//   .bind<ErrorHandler>(TOKEN_CLIENT.ErrorHandler)
//   .to(ErrorHandler)
//   .inSingletonScope()

/*
  ********************
  Storage
  ********************
*/
// container
//   .bind<KeyValueStorage>(TOKEN_CLIENT.KeyValueStorage)
//   .toDynamicValue(() => new Storage({ base: "app" }))
//   .inSingletonScope()

export { container }
