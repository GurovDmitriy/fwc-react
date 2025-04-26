import { expect, test } from "@playwright/test"

test("SignPage: toggle SignUp and SignIn pages", async ({ page }) => {
  // arrange
  await page.goto("http://localhost:3000/sign-in")

  // act
  await expect(page.getByRole("main")).toContainText("Sign In")
  await page.getByRole("link", { name: "Sign Up" }).click()

  // assert
  await expect(page.getByRole("main")).toContainText("Sign Up")
})
