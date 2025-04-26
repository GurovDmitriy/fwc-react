import axios from "axios"

export interface Fetcher {
  instance: ReturnType<typeof axios.create>
}
