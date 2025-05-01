"use client"

import { useEffect } from "react"

export default function PageError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.log("Error", error)
  }, [error])

  return (
    <div>
      Something went wrong.
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
