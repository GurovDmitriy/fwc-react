/// <reference types="vite/client" />

declare module "*.svg" {
  import { FC, SVGProps } from "react"
  const content: FC<SVGProps<SVGElement & { className?: string }>>
  export default content
}

declare module "*.svg?url" {
  const content: any
  export default content
}
