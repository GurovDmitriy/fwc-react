"use client"

import {
  APP_CONFIG_TESTING_SERVICE,
  ConfigTesting,
  TOKEN_CONFIG_TESTING,
} from "@/composition/configTesting"
import {
  APP_ENV_SERVICE,
  Environment,
  TOKEN_ENV_SERVICE,
} from "@/composition/environments"
import {
  ErrorMapper,
  ErrorService,
  ErrorServiceDefault,
  TOKEN_ERROR_MAPPER,
  TOKEN_ERROR_SERVICE,
} from "@/core/error"
import { Fetcher, FetcherBase, TOKEN_FETCHER } from "@/core/fetcher"
import {
  MediaQuery,
  MediaQueryService,
  TOKEN_MEDIA_QUERY,
} from "@/core/media-query"
import { APP_STORAGE_TOKEN, StorageBase, type AppStorage } from "@/core/storage"
import { ErrorMapperDefault } from "@/domains/error/ErrorMapperDefault"
import { Container } from "inversify"

const container = new Container({
  autobind: true,
  defaultScope: "Singleton",
})

/*
  ********************
  Env
  ********************
*/
container.bind<Environment>(TOKEN_ENV_SERVICE).toConstantValue(APP_ENV_SERVICE)
container
  .bind<ConfigTesting>(TOKEN_CONFIG_TESTING)
  .toConstantValue(APP_CONFIG_TESTING_SERVICE)

/*
  ********************
  error
  ********************
*/
container
  .bind<ErrorService>(TOKEN_ERROR_SERVICE)
  .to(ErrorServiceDefault)
  .inSingletonScope()

container
  .bind<ErrorMapper>(TOKEN_ERROR_MAPPER)
  .to(ErrorMapperDefault)
  .inSingletonScope()

/*
  ********************
  Storage
  ********************
*/
container.bind<AppStorage>(APP_STORAGE_TOKEN).to(StorageBase).inSingletonScope()

/*
  ********************
  fetcher
  ********************
*/
container.bind<Fetcher>(TOKEN_FETCHER).to(FetcherBase).inSingletonScope()

/*
  ********************
  Media Query
  ********************
*/
container
  .bind<MediaQuery>(TOKEN_MEDIA_QUERY)
  .to(MediaQueryService)
  .inSingletonScope()

export { container }
