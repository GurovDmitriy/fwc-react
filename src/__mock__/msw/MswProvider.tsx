"use client"

import { useEffect, useState } from "react"

export function MswProvider({ children }) {
  const [init, setInit] = useState(false)

  useEffect(() => {
    if (init) return

    const setup = async () => {
      const { worker, mockDB } = await import("./worker")

      mockDB.init()

      return worker
        .start({
          serviceWorker: {
            url:
              process.env.NODE_ENV === "production"
                ? "/fwc-react/mockServiceWorker.js"
                : "/mockServiceWorker.js",
          },
        })
        .then(() => {
          setInit(true)
        })
    }

    setup()
  }, [init])

  if (init) {
    return children
  } else {
    return <div>Loading MSW...</div>
  }
}
