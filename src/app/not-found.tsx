"use client"

import { useAppInject } from "@/composition/container/client/ContainerProvider"
import { ErrorService, TOKEN_ERROR_SERVICE } from "@/core/error"
import { useEffect } from "react"

export default function PageNotFound() {
  const errorService = useAppInject<ErrorService>(TOKEN_ERROR_SERVICE)

  useEffect(() => {
    console.log("PageNotFoundPrivate")
    errorService.handle({ status: 404 })
  }, [errorService])

  return null
}
