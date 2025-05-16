"use client"

import { CategoriesList } from "@/features/CategoriesList"
import styles from "./page.module.scss"

export default function PageHome() {
  return (
    <div className={styles.container}>
      <CategoriesList />
    </div>
  )
}
