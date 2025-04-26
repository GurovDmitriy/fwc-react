import { type Fetcher, TOKEN_FETCHER } from "@/core/fetcher"
import { inject, injectable } from "inversify"

@injectable()
export class PreviewApiService {
  constructor(@inject(TOKEN_FETCHER) private fetcher: Fetcher) {}

  list() {
    return this.fetcher.instance.get("/category")
  }
}
