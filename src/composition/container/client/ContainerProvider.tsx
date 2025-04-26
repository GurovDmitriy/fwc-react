"use client"

import { ServiceIdentifier } from "inversify"
import { createContext, type PropsWithChildren, use, useRef } from "react"
import { container } from "./container"

export interface ContainerProviderContextMethods {
  inject<TType = any, TToken = unknown>(
    serviceIdentifier: ServiceIdentifier<TToken>,
  ): TType
}

export const ContainerProviderContext =
  createContext<ContainerProviderContextMethods | null>(null)

export function ContainerProvider({ children }: PropsWithChildren) {
  const methods = useRef({
    inject<TType = any, TToken = unknown>(
      serviceIdentifier: ServiceIdentifier<TToken>,
    ) {
      return container.get<TType>(serviceIdentifier)
    },
  })

  return (
    <ContainerProviderContext value={methods.current}>
      {children}
    </ContainerProviderContext>
  )
}

export function useAppInject<TType = any, TToken = unknown>(
  serviceIdentifier: ServiceIdentifier<TToken>,
) {
  const ctx = use(ContainerProviderContext)

  if (ctx === null) {
    throw new Error("DI ctx not found")
  }

  return ctx.inject<TType, TToken>(serviceIdentifier)
}
