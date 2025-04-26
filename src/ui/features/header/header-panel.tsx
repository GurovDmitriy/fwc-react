"use client"

import { Typography } from "antd"
import styles from "./header-panel.module.scss"

const { Text } = Typography

export function HeaderPanel() {
  return (
    <div className={styles.header}>
      <Text className={styles.logo} type="secondary">
        FWC-React: Shopping Cart
      </Text>
    </div>
  )
}
