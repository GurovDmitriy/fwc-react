"use client"

import { useCategoriesList } from "@/domains/Categories"
import { CategoryCard } from "@/features/CategoryCard"
import styles from "./page.module.scss"

export default function PageHome() {
  const { categories } = useCategoriesList()

  return (
    <div className={styles.container}>
      <div className={styles.categories}>
        {categories.map((category) => (
          <CategoryCard
            className={styles.category}
            key={category.id}
            category={category}
          />
        ))}
      </div>
    </div>
  )
}
