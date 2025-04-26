import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import * as hooks from "@/core/store/hooks"
import { AuthStore, useAuthSignUpUsecase } from "@/domains/auth"
import { AuthApiService } from "@/domains/auth/internal"
import { AuthSignUpPayload } from "@/domains/auth/types"
import { act, renderHook } from "@testing-library/react"
import { TestBed } from "../../../../test-utils"

describe("AuthSignUpUsecase", () => {
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
      signUpEffect: vi.fn((args) => args),
      authSlice: {
        selectors: {
          selectState: { status: "useless" },
        },
      },
    }

    const api: AuthApiService = {} as AuthApiService

    testBed = new TestBed({
      deps: [
        [AuthStore, authStore],
        [AuthApiService, api],
      ],
    })

    mockAuthStore = testBed.inject(AuthStore)
  })

  afterEach(() => {
    vi.clearAllMocks()
    testBed.destroy()
  })

  it("handle should trigger methods", () => {
    // arrange
    const hook = renderHook(() => useAuthSignUpUsecase(), {
      wrapper: testBed.Provider,
    })

    const mockPayload: AuthSignUpPayload = {
      name: "name",
      email: "email@email.com",
      password: "1234",
      passwordConfirm: "1234",
    }

    // act
    hook.result.current.handle(mockPayload)

    // assert
    expect(spyAppDispatch).toHaveBeenCalled()
    expect(spyUseAppSelector).toHaveBeenCalled()
    expect(mockAuthStore.signUpEffect).toHaveBeenCalled()
  })

  it("toggleAbout should trigger add and remove additional field", () => {
    // arrange
    const hook = renderHook(() => useAuthSignUpUsecase(), {
      wrapper: testBed.Provider,
    })
    const initLength = hook.result.current.form.length

    // act
    act(() => {
      hook.result.current.toggleAbout()
    })
    hook.rerender()

    // assert
    expect(hook.result.current.form.length).toBeGreaterThan(initLength)

    act(() => {
      hook.result.current.toggleAbout()
    })
    hook.rerender()

    // assert
    expect(hook.result.current.form.length).toEqual(initLength)
  })
})
