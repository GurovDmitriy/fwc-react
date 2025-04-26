"use client"

import type { ServiceIdentifier } from "inversify"
import React from "react"
import { container } from "../container"

export function injectForComponent<TDeps extends object>(dependencies: {
  [K in keyof TDeps]: ServiceIdentifier<TDeps[K]>
}) {
  return function <P extends TDeps>(
    ComponentWrapped: React.ComponentType<P>,
  ): React.FC<Partial<Omit<P, keyof TDeps>>> {
    return function injectForComponent(props: Omit<P, keyof TDeps>) {
      const injectedProps = Object.keys(dependencies).reduce((acc, key) => {
        acc[key as keyof TDeps] = container.get(
          dependencies[key as keyof TDeps],
        )
        return acc
      }, {} as TDeps)

      return <ComponentWrapped {...(props as P)} {...injectedProps} />
    }
  }
}

export function injectForFn<TDeps extends object>(dependencies: {
  [K in keyof TDeps]: ServiceIdentifier<TDeps[K]>
}) {
  return function <TResult>(hook: (deps: TDeps) => TResult): () => TResult {
    return function injectForFn() {
      const injectedDeps = Object.keys(dependencies).reduce((acc, key) => {
        acc[key as keyof TDeps] = container.get(
          dependencies[key as keyof TDeps],
        )
        return acc
      }, {} as TDeps)

      return hook(injectedDeps)
    }
  }
}
