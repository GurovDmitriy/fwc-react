"use client"

import {
  HomeOutlined,
  MenuOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons"
import { Button, Menu } from "antd"
import Link from "next/link"
import { usePathname } from "next/navigation"
import styles from "./sider-panel.module.scss"

interface Props {
  isCollapsed: boolean
  toggleMenu: () => void
}

export function SiderPanel({ isCollapsed, toggleMenu }: Props) {
  const pathname = usePathname()

  const items = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: <Link href="/">home</Link>,
    },
    {
      key: "/card",
      icon: <ShoppingCartOutlined />,
      label: <Link href="/card">сard</Link>,
    },
    {
      key: "/account",
      icon: <UserOutlined />,
      label: <Link href="/account">account</Link>,
    },
  ]

  return (
    <div className={styles.sider}>
      <div className={styles.header}>
        <Button type="text" className={styles.button} onClick={toggleMenu}>
          <MenuOutlined />
        </Button>
      </div>
      <Menu
        className={styles.navigation}
        mode="inline"
        items={items}
        selectedKeys={[pathname]}
        inlineCollapsed={isCollapsed}
      />
    </div>
  )
}
