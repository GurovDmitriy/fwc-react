"use client"

import { injectable } from "inversify"
import { BehaviorSubject } from "rxjs"
import { MediaQuery, MediaQueryState, MediaQueryStateKeyName } from "./types"

@injectable()
export class MediaQueryService implements MediaQuery {
  private mediaQueries = new Map<MediaQueryStateKeyName, MediaQueryList>()
  private listeners = new Map<
    MediaQueryStateKeyName,
    (event: MediaQueryListEvent) => void
  >()

  private breakpoints = {
    xs: "(min-width: 0px) and (max-width: 575px)",
    sm: "(min-width: 576px) and (max-width: 767px)",
    md: "(min-width: 768px) and (max-width: 991px)",
    lg: "(min-width: 992px) and (max-width: 1199px)",
    xl: "(min-width: 1200px) and (max-width: 1599px)",
    xxl: "(min-width: 1600px)",
  }

  private stateSubject = new BehaviorSubject<MediaQueryState>({
    xs: false,
    sm: false,
    md: false,
    lg: false,
    xl: false,
    xxl: false,
  })

  public state$ = this.stateSubject.asObservable()

  constructor() {
    this._initMediaQueries()
    this._updateInitialState()
  }

  public defaultState = this.stateSubject.getValue()

  private _initMediaQueries() {
    const breakpoints = Object.entries(this.breakpoints)

    for (const [key, query] of breakpoints) {
      if (typeof window !== "undefined") {
        const mediaQuery = window.matchMedia(query)

        const listener = (event: MediaQueryListEvent) => {
          this.stateSubject.next({
            ...this.stateSubject.getValue(),
            [key]: event.matches,
          })
        }

        mediaQuery.addEventListener("change", listener)
        this.mediaQueries.set(key as MediaQueryStateKeyName, mediaQuery)
        this.listeners.set(key as MediaQueryStateKeyName, listener)
      }
    }
  }

  private _updateInitialState() {
    const state = { ...this.stateSubject.getValue(), ready: true }

    for (const [key, query] of this.mediaQueries) {
      if (query.matches) {
        state[key] = true
      }
    }

    this.stateSubject.next(state)
  }

  public destroy(): void {
    this.listeners.forEach((listener, key) => {
      const mediaQuery = this.mediaQueries.get(key as MediaQueryStateKeyName)
      mediaQuery?.removeEventListener("change", listener)
    })
  }
}
