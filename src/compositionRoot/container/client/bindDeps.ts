"use client"

import { container } from "./container"

export function bindDependenciesClient(func: any, dependencies: any) {
  const injections = dependencies.map((dependency: any) => {
    return container.get(dependency)
  })
  return func.bind(func, ...injections)
}
