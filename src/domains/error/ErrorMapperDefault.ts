import {
  ErrorBaseFactory,
  type ErrorFactory,
  ErrorMapped,
  ErrorMapper,
} from "@/core/error"
import { AxiosError } from "axios"
import { inject, injectable } from "inversify"

@injectable()
export class ErrorMapperDefault implements ErrorMapper {
  constructor(@inject(ErrorBaseFactory) private errorFactory: ErrorFactory) {}

  handle(error: any): ErrorMapped {
    if (error instanceof AxiosError) {
      if (error.status === 404) {
        return this.errorFactory.create({
          status: 404,
          code: "app/error_mapped/http/notfound",
          message: "not found",
          original: error,
        })
      }

      return this.errorFactory.create({
        status: 404,
        code: "app/error_mapped/http/notfound",
        message: "not found",
        original: error,
      })
    }

    return this.errorFactory.create({
      status: 0,
      code: "app/error_mapped/unknown",
      message: "Unknown error",
      original: error,
    })
  }
}
