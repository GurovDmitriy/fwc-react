import { useCategoriesList } from "@/domains/Categories"
import { Drawer } from "antd"
import type { DrawerClassNames } from "antd/es/drawer/DrawerPanel"
import styles from "./AppSidebar.module.scss"

const classNames: DrawerClassNames = {
  header: styles.header,
  wrapper: styles.wrapper,
}

export function AppSidebar({ isOpen }) {
  const { categories } = useCategoriesList()

  return (
    <Drawer
      className={styles.sidebar}
      classNames={classNames}
      placement="left"
      open={isOpen}
      mask={false}
    >
      <nav>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <a href="#">{category.value}</a>
            </li>
          ))}
        </ul>
      </nav>
    </Drawer>
  )
}
