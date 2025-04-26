import { Col } from "antd"
import styles from "./placeholder-card.module.scss"

export function PreviewPlaceholderCard() {
  const placeholder = Array.from({ length: 16 }, (_, k) => ({
    id: k,
  }))

  return placeholder.map((_, id) => (
    <Col className={styles.col} xs={24} sm={12} md={12} lg={6} key={id}>
      <div className={styles.skeleton}></div>
    </Col>
  ))
}
