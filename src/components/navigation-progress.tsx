"use client"
import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import LoadingBar, { type LoadingBarRef } from "react-top-loading-bar"

export function NavigationProgress() {
  const ref = useRef<LoadingBarRef>(null)
  const pathname = usePathname()

  useEffect(() => {
    // Start progress bar on path change
    ref.current?.continuousStart()

    // Complete progress bar after short delay
    const timer = setTimeout(() => {
      ref.current?.complete()
    }, 400)

    return () => clearTimeout(timer)
  }, [pathname]) // Runs whenever route changes

  return (
    <LoadingBar
      color="var(--muted-foreground)"
      ref={ref}
      shadow={true}
      height={2}
    />
  )
}
