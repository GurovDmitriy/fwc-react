import { type Fetcher, TOKEN_FETCHER } from "@/core/fetcher"
import {
  AuthMeUpdatePayload,
  AuthSignInPayload,
  AuthSignToken,
  AuthSignUpPayload,
  AuthUser,
} from "@/domains/auth/types"
import { inject, injectable } from "inversify"

@injectable()
export class AuthApiService {
  constructor(@inject(TOKEN_FETCHER) private fetcher: Fetcher) {}

  signUp(payload: AuthSignUpPayload) {
    return this.fetcher.instance.post<AuthSignToken>("/auth/sign-up", payload)
  }

  signIn(payload: AuthSignInPayload) {
    return this.fetcher.instance.post<AuthSignToken>("/auth/sign-in", payload)
  }

  signOut() {
    return this.fetcher.instance.post<any>("/auth/sign-out")
  }

  me() {
    return this.fetcher.instance.get<AuthUser>("/auth/me")
  }

  meUpdate(payload: AuthMeUpdatePayload) {
    return this.fetcher.instance.post<AuthUser>("/auth/me-update", payload)
  }

  refresh(tokenRefresh: string) {
    return this.fetcher.instance.post<AuthSignToken>("/auth/refresh", {
      tokenRefresh,
    })
  }

  validateEmail(email: string) {
    return this.fetcher.instance.post<any>("/auth/validate-email", {
      email,
    })
  }
}
