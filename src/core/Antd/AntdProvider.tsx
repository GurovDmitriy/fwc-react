"use client"

import { AntdRegistry } from "@ant-design/nextjs-registry"
import { ConfigProvider, theme } from "antd"
import React from "react"

import {
  createCache,
  extractStyle,
  // px2remTransformer,
  StyleProvider,
} from "@ant-design/cssinjs"
import { SeedToken } from "antd/es/theme/interface"
import { MapToken } from "antd/lib/theme/interface"
import { useServerInsertedHTML } from "next/navigation"
import { useState } from "react"

// const px2rem = px2remTransformer({
//   rootValue: 16,
// })

const customAlgorithm = (_seedToken: SeedToken, mapToken: MapToken) => {
  return {
    ...mapToken,
    // gold1: "#FFF2D9",
  }
}

const AntdProvider: React.FunctionComponent<React.PropsWithChildren> = ({
  children,
}) => {
  const [cache] = useState(() => createCache())

  useServerInsertedHTML(() => {
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `</script>${extractStyle(cache)}<script>`,
        }}
      />
    )
  })
  return (
    <StyleProvider cache={cache} layer>
      <AntdRegistry>
        <ConfigProvider
          input={{
            autoComplete: "one-time-code",
          }}
          theme={{
            cssVar: true,
            token: {},
            algorithm: [theme.defaultAlgorithm, customAlgorithm],
          }}
        >
          {children}
        </ConfigProvider>
      </AntdRegistry>
    </StyleProvider>
  )
}

export default AntdProvider
