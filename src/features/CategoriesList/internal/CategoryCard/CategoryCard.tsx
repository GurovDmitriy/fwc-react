import { Card } from "antd"
import clsx from "clsx"
import styles from "./CategoryCard.module.scss"

type CategoryProps = {
  className?: string
  category: {
    id: number
    value: string
    image?: string
  }
}

const { Meta } = Card

export function CategoryCard({ className, category }: CategoryProps) {
  return (
    <Card
      className={clsx(styles.category, className)}
      key={category.id}
      hoverable
      cover={
        <img
          className={styles["category-cover"]}
          alt="category cover"
          src={category.image}
        />
      }
    >
      <Meta className={styles["category-meta"]} title={category.value} />
    </Card>
  )
}
