"use client"

import { useAppInject } from "@/composition/container/client/ContainerProvider"
import { type ErrorService, TOKEN_ERROR_SERVICE } from "@/core/error"

export default function PageErrorsExample() {
  const errorService = useAppInject<ErrorService>(TOKEN_ERROR_SERVICE)

  return (
    <div>
      {/*<button onClick={() => wtf()}>onerror</button>*/}
      <button
        onClick={() => {
          fetch("/wtf").then((response) => {
            if (!response.ok) {
              throw new Error("async error")
            }
          })
        }}
      >
        onunhandledrejection
      </button>
      <button onClick={() => (window.location.href = "/wtf")}>404</button>
      <button
        onClick={() => {
          fetch("/api/504").then((response) => {
            errorService.handle({
              status: response.status,
            })
          })
        }}
      >
        504
      </button>
      <button
        onClick={() => {
          fetch("/api/403").then((response) => {
            errorService.handle({
              status: response.status,
            })
          })
        }}
      >
        403
      </button>
      <button
        onClick={() => {
          throw Error("1")
        }}
      >
        Global
      </button>
      <button
        onClick={() => {
          errorService.handle({})
        }}
      >
        Local
      </button>
    </div>
  )
}
