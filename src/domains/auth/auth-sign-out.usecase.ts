"use client"

import { useAppInject } from "@/composition/container/client/ContainerProvider"
import { useAppDispatch } from "@/core/store/hooks"
import { AuthStore } from "@/domains/auth/auth.store"

export const useAuthSignOutUsecase = () => {
  const authStore = useAppInject<AuthStore>(AuthStore)
  const dispatch = useAppDispatch()

  const handle = () => {
    dispatch(authStore.signOutEffect())
  }

  return {
    handle,
  }
}
