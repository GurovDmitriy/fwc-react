"use client"

import { FooterPanel } from "@/ui/features/footer"
import { Layout } from "antd"
import { PropsWithChildren } from "react"
import styles from "./layout.module.scss"

const { Footer, Content } = Layout

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <Layout className={styles.layout}>
      <Content className={styles.content}>{children}</Content>
      <Footer className={styles.footer}>
        <FooterPanel />
      </Footer>
    </Layout>
  )
}
