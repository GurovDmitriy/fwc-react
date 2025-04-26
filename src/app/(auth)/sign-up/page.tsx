"use client"

import { SignUpForm } from "@/ui/features/sign"
import styles from "./page.module.scss"

export default function SignUpHome() {
  return (
    <div className={styles.page}>
      <SignUpForm />
    </div>
  )
}
