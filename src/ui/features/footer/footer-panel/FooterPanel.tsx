"use client"

import { Typography } from "antd"
import styles from "./FooterPanel.module.scss"

const { Text } = Typography

export function FooterPanel() {
  return (
    <div className={styles.footer}>
      <Text type="secondary">FWC-React: Shopping Cart ©2024</Text>
    </div>
  )
}
