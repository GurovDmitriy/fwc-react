import { type Environment, TOKEN_ENV_SERVICE } from "@/composition/environments"
import { Fetcher } from "@/core/fetcher/types"
import axios from "axios"
import { inject, injectable } from "inversify"

@injectable()
export class FetcherBase implements Fetcher {
  _instance: ReturnType<typeof axios.create>

  constructor(@inject(TOKEN_ENV_SERVICE) private envService: Environment) {
    this._instance = axios.create({
      baseURL: this.envService.apiUrl,
    })
  }

  get instance() {
    return this._instance
  }
}
