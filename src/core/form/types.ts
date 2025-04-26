import { Rule } from "antd/es/form"
import { ReactNode } from "react"

export interface AppFormItem<TName extends string> {
  id: string
  name: TName
  type: string
  view: "text" | "password" | "email" | "textarea"
  placeholder: string
  prefix: ReactNode
  rules: Rule[]
}
