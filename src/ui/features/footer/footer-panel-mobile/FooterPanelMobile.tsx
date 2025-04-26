"use client"

import { ShopOutlined, ShoppingOutlined } from "@ant-design/icons"
import { Menu } from "antd"
import Link from "next/link"
import { usePathname } from "next/navigation"
import styles from "./FooterPanelMobile.module.scss"

const items = [
  {
    key: "/",
    label: (
      <Link href="/">
        <ShopOutlined />
      </Link>
    ),
  },
  {
    key: "/card",
    label: (
      <Link href="/card">
        <ShoppingOutlined />
      </Link>
    ),
  },
]

export function FooterPanelMobile({ ref }) {
  const pathname = usePathname()

  return (
    <div className={styles.footer} ref={ref}>
      <Menu
        className={styles.menu}
        mode="horizontal"
        items={items}
        selectedKeys={[pathname]}
      />
    </div>
  )
}
