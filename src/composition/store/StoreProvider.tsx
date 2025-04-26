"use client"

import { useAppInject } from "@/composition/container/client/ContainerProvider"
import type { AppStore } from "@/core/store/store"
import { useRef } from "react"
import { Provider } from "react-redux"
import { Store } from "./store"

/**
 * Caution!!!
 * Incorrect deps direction
 */
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const store = useAppInject<Store>(Store)

  const storeRef = useRef<AppStore>(undefined)

  if (!storeRef.current) {
    storeRef.current = store.makeStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
