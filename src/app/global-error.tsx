"use client"

import { useEffect } from "react"

export default function PageErrorGlobal({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.log(error)
  }, [error])

  return (
    <html>
      <body>
        Something went wrong.
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}
