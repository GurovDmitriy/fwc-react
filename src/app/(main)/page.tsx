"use client"

import { PreviewList } from "@/ui/features/preview-list"
import { Typography } from "antd"

const { Title } = Typography

export default function PageHome() {
  return (
    <>
      <Title level={2}>Home</Title>
      <PreviewList />
    </>
  )
}
