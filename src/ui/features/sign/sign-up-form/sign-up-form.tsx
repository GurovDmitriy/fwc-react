"use client"

import { FormFieldDynamic } from "@/core/form/FormFieldDynamic"
import { useAuthSignUpUsecase } from "@/domains/auth/auth-sign-up.usecase"
import { Button, Card, Flex, Form, Space } from "antd"
import Link from "next/link"
import styles from "./sign-up-form.module.scss"

export function SignUpForm() {
  const signUp = useAuthSignUpUsecase()

  return (
    <div>
      <Card className={styles.card} title={<h2>Sign Up</h2>}>
        <Form
          onFinish={(event) => signUp.handle(event)}
          disabled={signUp.state.status === "pending"}
          validateMessages={signUp.validateMessages}
        >
          <FormFieldDynamic list={signUp.form}></FormFieldDynamic>

          <Flex justify="space-between">
            <Space>
              <Button type="primary" htmlType="submit">
                Sign Up
              </Button>
              or
              <Link href="/sign-in">Sign In</Link>
            </Space>

            <Button htmlType="button" onClick={() => signUp.toggleAbout()}>
              About
            </Button>
          </Flex>
        </Form>
      </Card>
    </div>
  )
}
