import { LockOutlined, MailOutlined } from "@ant-design/icons"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, test } from "vitest"
import { SignInForm } from "./sign-in-form"

const handleMock = vi.fn()

vi.mock("@/domains/auth/auth-sign-in.usecase", () => {
  return {
    useAuthSignInUsecase: () => ({
      state: { status: "useless" },
      form: {
        email: {
          id: "field-email",
          name: "email",
          type: "email",
          placeholder: "Email",
          view: "email",
          prefix: <MailOutlined />,
          rules: [{ type: "email", required: true }],
        },
        password: {
          id: "field-password",
          name: "password",
          type: "password",
          view: "password",
          placeholder: "Password",
          prefix: <LockOutlined />,
          rules: [{ required: true }],
        },
      },
      validateMessages: {
        required: () => "${name} is required",
        types: {
          email: "${name} format is invalid",
        },
      },
      handle: handleMock,
    }),
  }
})

describe("SignInForm", () => {
  beforeEach(() => {
    handleMock.mockClear()
  })

  describe("display", () => {
    test("display SignIn caption", async () => {
      // arrange
      render(<SignInForm />)

      // act

      // assert
      expect(
        screen.getByRole("heading", { level: 2, name: "Sign In" }),
      ).toBeDefined()
    })

    test("display submit button", async () => {
      // arrange
      render(<SignInForm />)

      // act

      // assert
      expect(screen.getByRole("button", { name: /sign in/i })).toBeDefined()
    })

    test("display input with Email placeholder", async () => {
      // arrange
      render(<SignInForm />)

      // act
      const input = screen.getByPlaceholderText("Email")

      // assert
      expect(input).toBeDefined()
    })

    test("display link with Sign In text", async () => {
      // arrange
      render(<SignInForm />)

      // act
      const element = screen.getByRole("link", { name: /sign up/i })

      // assert
      expect(element).toBeDefined()
    })
  })

  describe("behavior buttons", () => {
    test("trigger handle method", async () => {
      // arrange
      render(<SignInForm />)

      const inputEmail = screen.getByPlaceholderText("Email")
      const inputPassword = screen.getByPlaceholderText("Password")
      const button = screen.getByRole("button", { name: /sign in/i })

      // act
      await userEvent.type(inputEmail, "mark@gmail.com")
      await userEvent.type(inputPassword, "1234")
      await userEvent.click(button)

      // assert
      expect(handleMock).toHaveBeenCalled()
    })

    test("trigger field error message", async () => {
      // arrange
      render(<SignInForm />)

      const button = screen.getByRole("button", { name: /sign in/i })

      // act
      await userEvent.click(button)

      const errorElement = await screen.findByText(/email is required/i)

      // assert
      expect(errorElement).toBeInTheDocument()
    })
  })
})
