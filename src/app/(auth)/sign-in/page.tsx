"use client"

import { SignInForm } from "@/ui/features/sign"
import styles from "./page.module.scss"

export default function SignInHome() {
  return (
    <div className={styles.page}>
      <SignInForm />
    </div>
  )
}
