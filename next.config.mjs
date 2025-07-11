/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  basePath: process.env.NODE_ENV === "production" ? "/fwc-react" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/fwc-react/" : "",

  webpack: (config) => {
    config.parallelism = 1

    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg"),
    )

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ["@svgr/webpack"],
      },
    )

    fileLoaderRule.exclude = /\.svg$/i

    return config
  },

  sassOptions: {
    additionalData: '@use "@/composition/styles/global.scss" as *;',
  },

  compiler: {
    styledComponents: true,
  },
}

export default nextConfig
