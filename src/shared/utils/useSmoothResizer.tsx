"use client"

import { RefObject, useEffect } from "react"

export function useSmoothResize(refs: RefObject<HTMLElement>[]) {
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      requestAnimationFrame(() => {
        refs.forEach((ref) => {
          if (ref.current) {
            ref.current.style.left = `calc(100% - ${entry.contentRect.width}px)`
            ref.current.style.width = `${entry.contentRect.width}px`
          }
        })
      })
    })

    return () => {
      observer.disconnect()
    }
  }, [refs])
}
