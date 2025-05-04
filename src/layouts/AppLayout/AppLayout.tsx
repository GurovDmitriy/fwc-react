"use client"

import { AppHeader } from "@/features/AppHeader"
import { AppSidebar } from "@/features/AppSidebar"
import { ConfigProvider, Layout } from "antd"
import { type PropsWithChildren, useState } from "react"
import styles from "./AppLayout.module.scss"
import { theme } from "./theme"

const { Header, Footer, Content } = Layout

export function AppLayout({ children }: PropsWithChildren) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev)
  }

  return (
    <ConfigProvider theme={theme}>
      <Layout className={styles.layout}>
        <Header className={styles.header}>
          <AppHeader
            isSidebarOpen={isSidebarOpen}
            onSidebarOpen={toggleSidebar}
          />
        </Header>
        <AppSidebar isOpen={isSidebarOpen} />
        <Content className={styles.content}>{children}</Content>
        <Footer className={styles.footer}>Футер</Footer>
      </Layout>
    </ConfigProvider>
  )
}
