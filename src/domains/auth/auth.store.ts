"use client"

import {
  ErrorMapped,
  type ErrorService,
  TOKEN_ERROR_SERVICE,
} from "@/core/error"
import { type Fetcher, TOKEN_FETCHER } from "@/core/fetcher"
import { StatusName } from "@/core/status"
import { APP_STORAGE_TOKEN, type AppStorage } from "@/core/storage"
import { AuthApiService } from "@/domains/auth/internal"
import {
  AuthMeUpdatePayload,
  AuthSignInPayload,
  AuthSignUpPayload,
  AuthUser,
} from "@/domains/auth/types"
import { createAsyncThunk, createSlice, Reducer, Slice } from "@reduxjs/toolkit"
import { inject, injectable } from "inversify"

type ActionName = "signUp" | "signIn" | "signOut" | "me" | "meUpdate"

export interface AuthState {
  status: StatusName
  statusDetail: "useless" | `${ActionName}/${Exclude<StatusName, "useless">}`
  isAuth: boolean
  user: AuthUser | null
  error: ErrorMapped | null
}

@injectable()
export class AuthStore {
  private errorService: ErrorService
  private api: AuthApiService
  private storage: AppStorage
  private fetcher: Fetcher

  private config = {
    tokenAccessName: "tokenAccess",
    tokenRefreshName: "tokenRefresh",
    tokenRefreshApiPath: "/refresh",
  } as const

  private initialState: AuthState = {
    status: "useless",
    statusDetail: "useless",
    isAuth: false,
    user: null,
    error: null,
  }

  signUpEffect: ReturnType<typeof createAsyncThunk<AuthUser, AuthSignUpPayload>>
  signInEffect: ReturnType<typeof createAsyncThunk<AuthUser, AuthSignInPayload>>
  signOutEffect: ReturnType<typeof createAsyncThunk<undefined>>
  meEffect: ReturnType<typeof createAsyncThunk<AuthUser>>
  meUpdateEffect: ReturnType<
    typeof createAsyncThunk<AuthUser, AuthMeUpdatePayload>
  >

  authSlice: Slice<
    AuthState,
    {},
    "auth",
    "auth",
    {
      selectState: (state: AuthState) => AuthState
      selectStatus: (
        state: AuthState,
      ) => "useless" | "pending" | "success" | "failure"
      selectIsAuth: (state: AuthState) => boolean
      selectUser: (state: AuthState) => AuthUser
      selectError: (state: AuthState) => ErrorMapped
    }
  >

  reducer: Reducer<AuthState>

  constructor(
    @inject(TOKEN_ERROR_SERVICE) errorService: ErrorService,
    @inject(APP_STORAGE_TOKEN) storage: AppStorage,
    @inject(TOKEN_FETCHER) fetcher: Fetcher,
    api: AuthApiService,
  ) {
    this.errorService = errorService
    this.api = api
    this.storage = storage
    this.fetcher = fetcher

    this.signUpEffect = createAsyncThunk<AuthUser, AuthSignUpPayload>(
      "signUp",
      async (payload: AuthSignUpPayload) => {
        try {
          const response = await this.api.signUp(payload)

          await this.storage.instance.setItem(
            "tokenAccess",
            response.data.tokenAccess,
          )
          await this.storage.instance.setItem(
            "tokenRefresh",
            response.data.tokenRefresh,
          )

          const me = await api.me()
          return me.data
        } catch (error) {
          return Promise.reject(this.errorService.handle(error))
        }
      },
    )

    this.signInEffect = createAsyncThunk<AuthUser, AuthSignInPayload>(
      "signIn",
      async (payload: AuthSignInPayload) => {
        try {
          const response = await this.api.signIn(payload)

          await this.storage.instance.setItem(
            "tokenAccess",
            response.data.tokenAccess,
          )
          await this.storage.instance.setItem(
            "tokenRefresh",
            response.data.tokenRefresh,
          )

          const me = await api.me()
          return me.data
        } catch (error) {
          return Promise.reject(this.errorService.handle(error))
        }
      },
    )

    this.signOutEffect = createAsyncThunk("signOut", async () => {
      try {
        await this.storage.instance.removeItem(this.config.tokenAccessName)
        await this.storage.instance.removeItem(this.config.tokenRefreshName)

        const response = await this.api.signOut()
        return response.data
      } catch (error) {
        return Promise.reject(this.errorService.handle(error))
      }
    })

    this.meEffect = createAsyncThunk<AuthUser>("me", async () => {
      try {
        const response = await this.api.me()
        return response.data
      } catch (error) {
        return Promise.reject(this.errorService.handle(error))
      }
    })

    this.meUpdateEffect = createAsyncThunk<AuthUser, AuthMeUpdatePayload>(
      "meUpdate",
      async (payload: AuthMeUpdatePayload) => {
        try {
          const response = await this.api.meUpdate(payload)
          return response.data
        } catch (error) {
          return Promise.reject(this.errorService.handle(error))
        }
      },
    )

    this._createSlice()
    this._createReducer()

    this._tokenHeadersInterceptor()
    this._tokenRefreshInterceptor()
  }

  private _createSlice() {
    this.authSlice = createSlice({
      name: "auth",
      initialState: this.initialState,
      reducers: {},
      extraReducers: (builder) => {
        builder.addCase(this.signUpEffect.pending, (state) => {
          state.status = "pending"
          state.statusDetail = "signUp/pending"
          state.error = null
        })

        builder.addCase(this.signUpEffect.fulfilled, (state, action) => {
          state.status = "success"
          state.statusDetail = "signUp/success"
          state.user = action.payload
          state.isAuth = true
        })

        builder.addCase(this.signUpEffect.rejected, (state, action) => {
          state.status = "failure"
          state.statusDetail = "signUp/failure"
          state.user = null
          state.isAuth = false
          state.error = action.error as ErrorMapped
        })

        builder.addCase(this.signInEffect.pending, (state) => {
          state.status = "pending"
          state.statusDetail = "signIn/pending"
          state.error = null
        })

        builder.addCase(this.signInEffect.fulfilled, (state, action) => {
          state.status = "success"
          state.statusDetail = "signIn/success"
          state.user = action.payload
          state.isAuth = true
        })

        builder.addCase(this.signInEffect.rejected, (state, action) => {
          state.status = "failure"
          state.statusDetail = "signIn/failure"
          state.user = null
          state.isAuth = false
          state.error = action.error as ErrorMapped
        })

        builder.addCase(this.signOutEffect.pending, (state) => {
          state.status = "pending"
          state.statusDetail = "signOut/pending"
          state.error = null
        })

        builder.addCase(this.signOutEffect.fulfilled, (state) => {
          state.status = "success"
          state.statusDetail = "signOut/success"
          state.isAuth = false
          state.user = null
        })

        builder.addCase(this.signOutEffect.rejected, (state, action) => {
          state.status = "failure"
          state.statusDetail = "signOut/failure"
          state.error = action.error as ErrorMapped
        })

        builder.addCase(this.meEffect.pending, (state) => {
          state.status = "pending"
          state.statusDetail = "me/pending"
          state.error = null
        })

        builder.addCase(this.meEffect.fulfilled, (state, action) => {
          state.status = "success"
          state.statusDetail = "me/success"
          state.isAuth = true
          state.user = action.payload
        })

        builder.addCase(this.meEffect.rejected, (state, action) => {
          state.status = "failure"
          state.statusDetail = "me/failure"
          state.isAuth = false
          state.error = action.error as ErrorMapped
        })

        builder.addCase(this.meUpdateEffect.pending, (state) => {
          state.status = "pending"
          state.statusDetail = "meUpdate/pending"
          state.error = null
        })

        builder.addCase(this.meUpdateEffect.fulfilled, (state, action) => {
          state.status = "success"
          state.statusDetail = "meUpdate/success"
          state.isAuth = true
          state.user = action.payload
        })

        builder.addCase(this.meUpdateEffect.rejected, (state, action) => {
          state.status = "failure"
          state.statusDetail = "meUpdate/failure"
          state.error = action.error as ErrorMapped
        })
      },
      selectors: {
        selectState: (state) => state,
        selectStatus: (state) => state.status,
        selectIsAuth: (state) => state.isAuth,
        selectUser: (state) => state.user,
        selectError: (state) => state.error,
      },
    })
  }

  private _createReducer() {
    this.reducer = this.authSlice.reducer
  }

  private _tokenHeadersInterceptor() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this

    this.fetcher.instance.interceptors.request.use(
      async function (config) {
        const tokenAccess: string = await self.storage.instance.getItem<string>(
          self.config.tokenAccessName,
        )

        config.headers.Authorization = `Bearer ${tokenAccess}`

        return config
      },

      function (error) {
        return Promise.reject(error)
      },
    )
  }

  private _tokenRefreshInterceptor() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this

    this.fetcher.instance.interceptors.response.use(
      async function (value) {
        return Promise.resolve(value)
      },

      async function (error) {
        const originalReq = error.config as typeof error.config & {
          __retry: boolean
        }

        if (!error.response || error.response.status !== 401)
          return Promise.reject(error)

        if (originalReq.url?.includes(self.config.tokenRefreshApiPath))
          return Promise.reject(error)

        if (originalReq.__retry) return Promise.reject(error)

        originalReq.__retry = true

        const tokenRefresh =
          (await self.storage.instance.getItem<string>(
            self.config.tokenRefreshName,
          )) ?? ""

        const tokenNew = await self.api.refresh(tokenRefresh)

        await self.storage.instance.setItem(
          self.config.tokenAccessName,
          tokenNew.data.tokenAccess,
        )
        await self.storage.instance.setItem(
          self.config.tokenRefreshName,
          tokenNew.data.tokenRefresh,
        )

        return self.fetcher.instance(originalReq)
      },
    )
  }
}
