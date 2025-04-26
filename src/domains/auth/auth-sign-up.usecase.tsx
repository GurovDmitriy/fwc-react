"use client"

import { useAppInject } from "@/composition/container/client/ContainerProvider"
import { useAppDispatch, useAppSelector } from "@/core/store/hooks"
import { AuthStore } from "@/domains/auth/auth.store"
import { AuthApiService } from "@/domains/auth/internal"
import { AuthFormItem, AuthSignUpPayload } from "@/domains/auth/types"
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons"
import { debounce } from "lodash"
import type { ValidateMessages } from "rc-field-form/es/interface"
import { useRef, useState } from "react"

export const useAuthSignUpUsecase = () => {
  const authStore = useAppInject<AuthStore>(AuthStore)
  const authApi = useAppInject<AuthApiService>(AuthApiService)

  const dispatch = useAppDispatch()
  const state = useAppSelector(authStore.authSlice.selectors.selectState)

  const emailCheck = useRef(
    debounce(async (resolve, reject, value) => {
      try {
        await authApi.validateEmail(value)
        return resolve(undefined)
      } catch {
        return reject("email is exist")
      }
    }, 1000),
  )

  const [form, setForm] = useState<AuthFormItem<keyof AuthSignUpPayload>[]>([
    {
      id: "field-username",
      name: "name",
      type: "text",
      view: "text",
      placeholder: "Name",
      prefix: <UserOutlined />,
      rules: [{ required: true }],
    },

    {
      id: "field-email",
      name: "email",
      type: "email",
      view: "email",
      placeholder: "Email",
      prefix: <MailOutlined />,
      rules: [
        { required: true, type: "email" },
        () => ({
          async validator(_, value) {
            return new Promise((resolve, reject) => {
              if (!value) {
                return resolve(undefined)
              } else {
                return emailCheck.current(resolve, reject, value)
              }
            })
          },
        }),
      ],
    },

    {
      id: "field-password",
      name: "password",
      type: "password",
      view: "password",
      placeholder: "Password",
      prefix: <LockOutlined />,
      rules: [{ required: true, min: 4, max: 50 }],
    },

    {
      id: "field-password",
      name: "passwordConfirm",
      type: "password",
      view: "password",
      placeholder: "Password confirm",
      prefix: <LockOutlined />,
      rules: [
        { required: true, min: 4, max: 50 },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue("password") === value) {
              return Promise.resolve()
            }
            return Promise.reject("passwords don't match")
          },
        }),
      ],
    },
  ])

  const validateMessages: ValidateMessages = {
    required: () => "${name} is required",
    types: {
      email: "${name} format is invalid",
    },
  }

  function handle(formValues: AuthSignUpPayload) {
    dispatch(authStore.signUpEffect(formValues))
  }

  function toggleAbout() {
    const isExistAbout = form.findIndex((field) => field.name === "about")

    if (isExistAbout !== -1) {
      setForm([...form.filter((field) => field.name !== "about")])
    } else {
      setForm([
        ...form,
        {
          id: "field-about",
          name: "about",
          type: "text",
          view: "textarea",
          placeholder: "About",
          prefix: null,
          rules: [{ required: true, min: 4, max: 100 }],
        },
      ])
    }
  }

  return {
    state,
    form,
    validateMessages,
    toggleAbout,
    handle,
  }
}
