"use client"

import { Component, PropsWithChildren } from "react"

export class ErrorBoundaryReact extends Component<
  { onError: (error: Error) => void } & PropsWithChildren,
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props)

    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    this.props.onError(error)
  }

  render() {
    if (this.state.hasError) {
      return null
    }
    return this.props.children
  }
}
