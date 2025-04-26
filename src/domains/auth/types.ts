import { Rule } from "antd/es/form"
import { ReactNode } from "react"

export interface AuthUser {
  id: string
  name: string
  email: string
}

export interface AuthSignToken {
  id: string
  tokenAccess: string
  tokenRefresh: string
}

export interface AuthSignUpPayload {
  name: string
  email: string
  password: string
  passwordConfirm: string
  about?: string
}

export type AuthMeUpdatePayload = Pick<AuthSignUpPayload, "name">
export type AuthSignInPayload = Pick<AuthSignUpPayload, "email" | "password">

export interface AuthFormItem<T> {
  id: string
  name: T
  type: string
  view: "text" | "password" | "email" | "textarea"
  placeholder: string
  prefix: ReactNode
  rules: Rule[]
}
