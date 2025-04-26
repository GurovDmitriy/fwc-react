"use client"

import { Store } from "@/composition/store/store"

/**
 * Caution!!!
 * Incorrect deps direction
 */
export type AppStore = ReturnType<InstanceType<ReturnType<Store["makeStore"]>>>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
