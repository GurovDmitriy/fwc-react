import { usePreviewListUsecase } from "@/domains/preview/preview-list.usecase"
import { Row } from "antd"
import { PreviewCard, PreviewPlaceholderCard } from "./internal"

export function PreviewList() {
  const previewList = usePreviewListUsecase()

  return (
    <div>
      <Row gutter={[16, 16]}>
        {previewList.isPending ? <PreviewPlaceholderCard /> : <PreviewCard />}
      </Row>
    </div>
  )
}
