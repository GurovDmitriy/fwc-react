"use client"

import { useAppInject } from "@/composition/container/client/ContainerProvider"
import { ErrorService, TOKEN_ERROR_SERVICE } from "@/core/error"
import { notification } from "antd"
import type { ArgsProps } from "antd/es/notification"
import {
  type PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
} from "react"
import { tap } from "rxjs"

const NotifyContext = createContext(null!)

export function NotifyProvider({ children }: PropsWithChildren) {
  const errorService = useAppInject<ErrorService>(TOKEN_ERROR_SERVICE)

  const [api, contextHolder] = notification.useNotification()

  const open = useCallback(
    ({ type = "error", ...props }: ArgsProps) => {
      const key = `notify${Date.now()}`

      const close = api.destroy.bind(key)

      api[type]({
        key,
        message: props.message,
        placement: "bottomLeft",
        ...props,
      })

      return close
    },
    [api],
  )

  useEffect(() => {
    const subscriber = errorService.error$
      .pipe(
        tap((error) => {
          if (error && error.code === "app/error_mapped/http/notfound") {
            open({ message: error.message })
          }
        }),
      )
      .subscribe()

    return () => subscriber.unsubscribe()
  }, [errorService.error$, open])

  const value = {
    open,
  }

  return (
    <NotifyContext value={value}>
      {contextHolder}
      {children}
    </NotifyContext>
  )
}
