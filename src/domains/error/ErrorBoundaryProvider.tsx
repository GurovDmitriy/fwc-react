"use client"

import { useAppInject } from "@/composition/container/client/ContainerProvider"
import { ErrorMapped, ErrorService, TOKEN_ERROR_SERVICE } from "@/core/error"
import { ErrorBoundaryReact } from "@/core/error/ErrorBoundaryReact"
import {
  PropsWithChildren,
  ReactElement,
  cloneElement,
  useEffect,
  useState,
} from "react"
import { tap } from "rxjs"

interface Props extends PropsWithChildren {
  fallback: ReactElement<{ error: ErrorMapped; reset: () => void }>
}

export function ErrorBoundaryProvider({ children, fallback }: Props) {
  const errorService = useAppInject<ErrorService>(TOKEN_ERROR_SERVICE)

  const [error, setError] = useState<ErrorMapped | null>(null)

  useEffect(() => {
    const subscriber = errorService.error$
      .pipe(
        tap((error) => {
          setError(error as any)
        }),
      )
      .subscribe()

    return () => subscriber.unsubscribe()
  }, [errorService])

  function reset() {
    setError(null)
  }

  return error && error.code === "app/error_mapped/unknown" ? (
    cloneElement(fallback, { error, reset })
  ) : (
    <ErrorBoundaryReact onError={(error) => errorService.handle(error)}>
      {children}
    </ErrorBoundaryReact>
  )
}
