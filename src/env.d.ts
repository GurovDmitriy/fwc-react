declare interface Env {
  readonly NODE_ENV: string
  readonly NEXT_PUBLIC_APP_MODE: string
  readonly NEXT_PUBLIC_APP_URL: string
  readonly NEXT_PUBLIC_APP_API_URL: string
}

declare interface ImportMeta {
  readonly env: Env
}

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_APP_MODE: string
    readonly NEXT_PUBLIC_APP_URL: string
    readonly NEXT_PUBLIC_APP_API_URL: string
  }
}
