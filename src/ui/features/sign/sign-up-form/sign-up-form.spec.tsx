import { SignUpForm } from "@/ui/features/sign"
import { UserOutlined } from "@ant-design/icons"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, test } from "vitest"

const handleMock = vi.fn()
const toggleAboutMock = vi.fn()

vi.mock("@/domains/auth/auth-sign-up.usecase", () => {
  return {
    useAuthSignUpUsecase: () => ({
      state: { status: "useless" },
      form: [
        {
          id: "field-username",
          name: "name",
          type: "text",
          view: "text",
          placeholder: "Name",
          prefix: <UserOutlined />,
          rules: [{ required: true }],
        },
      ],
      validateMessages: {
        required: () => "${name} is required",
      },
      handle: handleMock,
      toggleAbout: toggleAboutMock,
    }),
  }
})

describe("SignUpForm", () => {
  beforeEach(() => {
    handleMock.mockClear()
    toggleAboutMock.mockClear()
  })

  describe("display", () => {
    test("display SignUp caption", async () => {
      // arrange
      render(<SignUpForm />)

      // act

      // assert
      expect(
        screen.getByRole("heading", { level: 2, name: "Sign Up" }),
      ).toBeDefined()
    })

    test("display submit button", async () => {
      // arrange
      render(<SignUpForm />)

      // act

      // assert
      expect(screen.getByRole("button", { name: /sign up/i })).toBeDefined()
    })

    test("display toggle About field button", async () => {
      // arrange
      render(<SignUpForm />)

      // act

      // assert
      expect(screen.getByRole("button", { name: /about/i })).toBeDefined()
    })

    test("display input with Name placeholder", async () => {
      // arrange
      render(<SignUpForm />)

      // act
      const input = screen.getByPlaceholderText("Name")

      // assert
      expect(input).toBeDefined()
    })

    test("display link with Sign In text", async () => {
      // arrange
      render(<SignUpForm />)

      // act
      const element = screen.getByRole("link", { name: /sign in/i })

      // assert
      expect(element).toBeDefined()
    })
  })

  describe("behavior buttons", () => {
    test("trigger handle method", async () => {
      // arrange
      render(<SignUpForm />)

      const input = screen.getByPlaceholderText("Name")
      const button = screen.getByRole("button", { name: /sign up/i })

      // act
      await userEvent.type(input, "Mark")
      await userEvent.click(button)

      // assert
      expect(handleMock).toHaveBeenCalled()
    })

    test("trigger toggleAbout method", async () => {
      // arrange
      render(<SignUpForm />)

      const button = screen.getByRole("button", { name: /about/i })

      // act
      await userEvent.click(button)

      // assert
      expect(toggleAboutMock).toHaveBeenCalled()
    })

    test("trigger field error message", async () => {
      // arrange
      render(<SignUpForm />)

      const button = screen.getByRole("button", { name: /sign up/i })

      // act
      await userEvent.click(button)

      const errorElement = await screen.findByText(/name is required/i)

      // assert
      expect(errorElement).toBeInTheDocument()
    })
  })
})
