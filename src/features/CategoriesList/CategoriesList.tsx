import { useCategoriesList } from "@/domains/Categories"
import styles from "./CategoriesList.module.scss"
import { CategoryCard } from "./internal"

export function CategoriesList() {
  const { categories } = useCategoriesList()

  return (
    <div className={styles.categories}>
      {categories.map((category) => (
        <CategoryCard
          className={styles.category}
          key={category.id}
          category={category}
        />
      ))}
    </div>
  )
}
