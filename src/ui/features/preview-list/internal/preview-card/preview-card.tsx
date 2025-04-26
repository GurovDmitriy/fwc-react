import { usePreviewListUsecase } from "@/domains/preview/preview-list.usecase"
import { Card, Col } from "antd"
import Link from "next/link"
import styles from "./preview-card.module.scss"

export function PreviewCard() {
  const previewList = usePreviewListUsecase()

  return previewList.data.map((item) => (
    <Col className={styles.col} xs={24} sm={12} md={12} lg={6} key={item.id}>
      <Card
        className={styles["image-card"]}
        cover={
          <div className={styles["image-box"]}>
            <img className={styles.image} src={item.image} alt="sneackers" />
          </div>
        }
      >
        <Link className={styles["image-name"]} href="#">
          {item.name}
        </Link>
      </Card>
    </Col>
  ))
}
