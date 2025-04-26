import { Environment, EnvironmentMode } from "./types"

export const APP_ENV_TESTING_SERVICE: Environment = {
  mode: process.env.NEXT_PUBLIC_APP_MODE as EnvironmentMode,
  appUrl: process.env.NEXT_PUBLIC_APP_URL,
  apiUrl: process.env.NEXT_PUBLIC_APP_API_URL,
}
