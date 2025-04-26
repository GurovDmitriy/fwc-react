import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import * as hooks from "@/core/store/hooks"
import { AuthStore, useAuthSignInUsecase } from "@/domains/auth"
import { AuthSignInPayload } from "@/domains/auth/types"
import { renderHook } from "@testing-library/react"
import { TestBed } from "../../../../test-utils"

describe("AuthSignInUsecase", () => {
  let testBed: TestBed

  let mockAuthStore
  let spyAppDispatch
  let spyUseAppSelector

  beforeEach(() => {
    spyAppDispatch = vi
      .spyOn(hooks, "useAppDispatch")
      .mockImplementation(() => () => vi.fn())

    spyUseAppSelector = vi
      .spyOn(hooks, "useAppSelector")
      .mockImplementation(() => vi.fn(() => ({ status: "useless" })))

    const authStore = {
      signInEffect: vi.fn((args) => args),
      authSlice: {
        selectors: {
          selectState: { status: "useless" },
        },
      },
    }

    testBed = new TestBed({
      deps: [[AuthStore, authStore]],
    })

    mockAuthStore = testBed.inject(AuthStore)
  })

  afterEach(() => {
    vi.clearAllMocks()
    testBed.destroy()
  })

  it("handle should trigger methods", () => {
    // arrange
    const hook = renderHook(() => useAuthSignInUsecase(), {
      wrapper: testBed.Provider,
    })

    const mockPayload: AuthSignInPayload = {
      email: "email@email.com",
      password: "1234",
    }

    // act
    hook.result.current.handle(mockPayload)

    // assert
    expect(spyAppDispatch).toHaveBeenCalled()
    expect(spyUseAppSelector).toHaveBeenCalled()
    expect(mockAuthStore.signInEffect).toHaveBeenCalled()
  })
})
