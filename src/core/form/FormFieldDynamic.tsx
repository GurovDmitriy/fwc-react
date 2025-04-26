"use client"

import { AppFormItem } from "@/core/form/types"
import { Form, Input } from "antd"
import { memo, ReactNode } from "react"

const { Item } = Form
const { TextArea } = Input

export interface FormFieldDynamicProps {
  list: AppFormItem<string>[]
  children?: (field: AppFormItem<string>) => ReactNode | null | undefined
}

export const FormFieldDynamic = memo(function FormFieldDynamic(
  props: FormFieldDynamicProps,
) {
  return props.list.map((field) => {
    if (props.children) {
      const element = props.children(field)

      if (element === null) return null
      if (element !== undefined) return element
    }

    if (field.view === "text") {
      return (
        <Item name={field.name} rules={field.rules} key={field.name}>
          <Input
            prefix={field.prefix}
            type={field.type}
            placeholder={field.placeholder}
          />
        </Item>
      )
    }

    if (field.view === "textarea") {
      return (
        <Item name={field.name} rules={field.rules} key={field.name}>
          <TextArea rows={4} placeholder={field.placeholder} />
        </Item>
      )
    }

    return (
      <Item name={field.name} rules={field.rules} key={field.name}>
        <Input
          prefix={field.prefix}
          type={field.type}
          placeholder={field.placeholder}
        />
      </Item>
    )
  })
})
