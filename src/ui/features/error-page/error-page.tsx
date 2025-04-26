"use client"

import { ErrorMapped } from "@/core/error"
import styles from "./error-page.module.scss"

export type ErrorPageProps = {
  error?: ErrorMapped
  reset?: () => void
}

type ErrorPageButtonsProps = {
  status: number
  reset: () => void
}

function reload(reset) {
  reset()

  if (typeof window !== "undefined") {
    window.location.reload()
  }
}

function redirect(reset) {
  reset()

  if (typeof window !== "undefined") {
    window.location.href = "/"
  }
}

function ErrorPageButtons({ status, reset }: ErrorPageButtonsProps) {
  switch (status) {
    case 504:
      return (
        <div>
          <button onClick={() => redirect(reset)}>На главную</button>
          <button onClick={() => reload(reset)}>Обновить страницу</button>
        </div>
      )
    default:
      return <button onClick={() => redirect(reset)}>На главную</button>
  }
}

export function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Error: {error?.message || "Unknown error (error-page)"}</h1>
        <ErrorPageButtons status={error.status} reset={reset} />
      </div>
    </div>
  )
}
