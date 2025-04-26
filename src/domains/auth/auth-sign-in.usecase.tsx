"use client"

import { useAppInject } from "@/composition/container/client/ContainerProvider"
import { AppFormItem } from "@/core/form"
import { useAppDispatch, useAppSelector } from "@/core/store/hooks"
import { AuthStore } from "@/domains/auth/auth.store"
import type { AuthSignInPayload } from "@/domains/auth/types"
import { LockOutlined, MailOutlined } from "@ant-design/icons"
import type { ValidateMessages } from "rc-field-form/es/interface"

export const useAuthSignInUsecase = () => {
  const authStore = useAppInject<AuthStore>(AuthStore)

  const dispatch = useAppDispatch()
  const state = useAppSelector(authStore.authSlice.selectors.selectState)

  const form: Record<string, AppFormItem<keyof AuthSignInPayload>> = {
    email: {
      id: "field-email",
      name: "email",
      type: "email",
      placeholder: "Email",
      view: "email",
      prefix: <MailOutlined />,
      rules: [{ type: "email", required: true }],
    },
    password: {
      id: "field-password",
      name: "password",
      type: "password",
      view: "password",
      placeholder: "Password",
      prefix: <LockOutlined />,
      rules: [{ required: true }],
    },
  }

  const validateMessages: ValidateMessages = {
    required: () => "${name} is required!",
    types: {
      email: "${name} format is invalid",
    },
  }

  const handle = (event: AuthSignInPayload) => {
    dispatch(authStore.signInEffect(event))
  }

  return {
    form,
    validateMessages,
    state,
    handle,
  }
}
