"use client"

import { useAppInject } from "@/composition/container/client/ContainerProvider"
import { useAppDispatch, useAppSelector } from "@/core/store/hooks"
import { AuthStore } from "@/domains/auth/auth.store"
import { usePathname, useRouter } from "next/navigation"
import { PropsWithChildren, useEffect, useRef } from "react"

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const pathname = usePathname()
  const router = useRouter()

  const authStore = useAppInject<AuthStore>(AuthStore)
  const dispatch = useAppDispatch()

  const authSelectState = useAppSelector(
    authStore.authSlice.selectors.selectState,
  )

  const isMeInit = useRef(false)

  useEffect(() => {
    if (isMeInit.current) return
    isMeInit.current = true

    dispatch(authStore.meEffect())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const isAuthRoute = ["/sign-in", "/sign-up"].includes(pathname)

    if (
      authSelectState.statusDetail === "signUp/success" ||
      authSelectState.statusDetail === "signIn/success" ||
      authSelectState.statusDetail === "me/success"
    ) {
      if (pathname !== "/") {
        router.replace("/")
      }
    } else if (
      authSelectState.statusDetail === "me/failure" ||
      authSelectState.statusDetail === "signOut/success" ||
      authSelectState.statusDetail === "signOut/failure"
    ) {
      if (!isAuthRoute) {
        router.replace("/sign-in")
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authSelectState.statusDetail])

  if (
    authSelectState.statusDetail === "useless" ||
    authSelectState.statusDetail === "me/pending" ||
    (authSelectState.statusDetail === "me/success" &&
      ["/sign-in", "/sign-up"].includes(pathname))
  ) {
    return <div>Loading me init...</div>
  }

  return children
}
