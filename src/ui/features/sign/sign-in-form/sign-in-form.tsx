"use client"

import { useAuthSignInUsecase } from "@/domains/auth"
import { Button, Card, Form, Input, Space } from "antd"
import Link from "next/link"
import styles from "./sign-in-form.module.scss"

const { Item } = Form

export function SignInForm() {
  const signIn = useAuthSignInUsecase()

  return (
    <div className={styles.form}>
      <Card className={styles.card} title={<h2>Sign In</h2>}>
        <Form
          onFinish={(event) => signIn.handle(event)}
          disabled={signIn.state.status === "pending"}
          validateMessages={signIn.validateMessages}
        >
          <Item name={signIn.form.email.name} rules={signIn.form.email.rules}>
            <Input
              prefix={signIn.form.email.prefix}
              type={signIn.form.email.type}
              placeholder={signIn.form.email.placeholder}
            />
          </Item>

          <Item
            name={signIn.form.password.name}
            rules={signIn.form.password.rules}
          >
            <Input
              prefix={signIn.form.password.prefix}
              type={signIn.form.password.type}
              placeholder={signIn.form.password.placeholder}
            />
          </Item>

          <Space>
            <Button type="primary" htmlType="submit">
              Sign In
            </Button>
            or
            <Link href="/sign-up">Sign Up</Link>
          </Space>
        </Form>
      </Card>
    </div>
  )
}
