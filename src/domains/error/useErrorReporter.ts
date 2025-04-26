"use client"

import { useAppInject } from "@/composition/container/client/ContainerProvider"
import { TOKEN_ERROR_SERVICE } from "@/core/error"
import type { ErrorService } from "@/core/error/types"
import { useEffect } from "react"
import { filter, tap } from "rxjs"

export function useErrorReporter() {
  const errorService = useAppInject<ErrorService>(TOKEN_ERROR_SERVICE)

  return function useErrorReportPrivate() {
    useEffect(() => {
      const subscriber = errorService.error$
        .pipe(
          filter((error) => !!error),
          tap((error) => {
            console.group("ErrorReporter")

            console.log("error:", error)

            console.groupEnd()
          }),
        )
        .subscribe()

      return () => subscriber.unsubscribe()
    }, [])
  }
}
