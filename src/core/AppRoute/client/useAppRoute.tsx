"use client"

import type { Params } from "next/dist/server/request/params"
import { useParams, usePathname } from "next/navigation"
import { useMemo } from "react"

export interface AppRouteListItem {
  segment: string
  alias: string
  path: string
  params: {
    key: string
    value: string
  }
}

/**
 * Output example:
 * {
 *   list: [
 *     {
 *       segment: "genre",
 *       alias: "/films/:[slug]",
 *       path: "/films/genre",
 *       params: {
 *         key: "[slug]",
 *         value: "genre"
 *       }
 *     }
 *   ],
 *   first: ...,
 *   last: ...
 * }
 */
export function useAppRoute() {
  const pathNameLib = usePathname()
  const paramsLib = useParams()

  const list = useMemo(() => {
    const list: AppRouteListItem[] = [
      "",
      ...pathNameLib.split("/").filter(Boolean),
    ].reduce((acc, segment, currentIndex) => {
      if (currentIndex === 0) {
        return [
          {
            segment: "",
            alias: "/",
            path: "/",
            params: null,
          },
        ]
      } else {
        const params = _getParams(segment, paramsLib)
        const prevNavItem = acc.at(-1)
        const separator = prevNavItem.path !== "/" ? "/" : ""
        const alias = [
          prevNavItem.alias,
          params?.key ? `:${params?.key}` : segment,
        ].join(separator)
        const path = [prevNavItem.path, params?.value || segment].join(
          separator,
        )

        return acc.concat([
          {
            segment,
            alias,
            path,
            params,
          },
        ])
      }
    }, [])

    return {
      list,
      first: list.at(0),
      last: list.at(-1),
    }
  }, [pathNameLib, paramsLib])

  return list
}

function _getParams(segment: string, params: Params) {
  const param = Object.entries(params).find((p) => p[1] === segment)

  return param?.[0]
    ? {
        key: param[0],
        value: param[1],
      }
    : null
}
