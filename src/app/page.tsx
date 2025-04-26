"use client"

import confetti from "canvas-confetti"
import { useRef } from "react"

import style from "./page.module.scss"

export default function HomePage() {
  const popperRef = useRef(null)

  const handlePop = () => {
    confetti({
      particleCount: 200,
      spread: 70,
      origin: { x: 0.5, y: 0.7 },
      colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"],
    })
  }

  return (
    <section className={style.section}>
      <div className={style.container}>
        <h1>Скоро тут будет какой-то балдеж</h1>
        <button className={style.button} ref={popperRef} onClick={handlePop}>
          урряяу!
        </button>
      </div>
    </section>
  )
}
