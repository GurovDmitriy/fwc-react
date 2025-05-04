import clsx from "clsx"
import styles from "./BurgerButton.module.scss"

type BurgerButtonProps = {
  isActive: boolean
  onActive: () => void
}

export function BurgerButton({ isActive, onActive }: BurgerButtonProps) {
  return (
    <button className={styles.burger} onClick={onActive}>
      <div
        className={clsx(styles["burger-line"], {
          [styles["burger-line_opened"]]: isActive,
        })}
      />
      <div
        className={clsx(styles["burger-line"], {
          [styles["burger-line_opened"]]: isActive,
        })}
      />
      <div
        className={clsx(styles["burger-line"], {
          [styles["burger-line_opened"]]: isActive,
        })}
      />
    </button>
  )
}
