"use client"

import { useAppInject } from "@/composition/container/client/ContainerProvider"
import { ErrorBaseFactory } from "@/core/error/ErrorBaseFactory"
import { TOKEN_ERROR_SERVICE } from "@/core/error/token"
import { useEffect } from "react"
import type { ErrorFactory, ErrorService } from "./types"

export function useErrorHandler() {
  const errorService = useAppInject<ErrorService>(TOKEN_ERROR_SERVICE)
  const errorFactory = useAppInject<ErrorFactory>(ErrorBaseFactory)

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.onerror = () => {
        errorService.handle(
          errorFactory.create({
            status: 0,
            code: "window/onerror",
            message: "Unknown error",
          }),
        )
        return true
      }

      window.onunhandledrejection = () => {
        errorService.handle(
          errorFactory.create({
            status: 0,
            code: "window/onerror",
            message: "Unknown error",
          }),
        )
      }
    }

    return () => {
      if (typeof window !== "undefined") {
        window.onerror = null
        window.onunhandledrejection = null
      }
    }
  }, [errorFactory, errorService])
}
