import { BurgerButton } from "@/shared/components/ui"
import styles from "./AppHeader.module.scss"

const navigation = [
  { title: "log in", slug: "login", link: "#", icon: "" },
  { title: "shopping bag", slug: "cart", link: "#", icon: "" },
]

type AppHeaderProps = {
  isSidebarOpen: boolean
  onSidebarOpen: () => void
}

export function AppHeader({ isSidebarOpen, onSidebarOpen }: AppHeaderProps) {
  return (
    <div className={styles.header}>
      <BurgerButton isActive={isSidebarOpen} onActive={onSidebarOpen} />
      <div className={styles.logo}>
        <div className={styles["logo-main"]}>FWC</div>
        <div className={styles["logo-description"]}>FWC—shop</div>
      </div>
      <nav className={styles.navigation}>
        <ul>
          {navigation.map((item) => (
            <li key={item.slug}>
              <a className={styles["navigation-item"]} href={item.link}>
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
