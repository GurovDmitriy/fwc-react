"use client"

import { useAppInject } from "@/composition/container/client/ContainerProvider"
import {
  MediaQueryService,
  MediaQueryState,
  TOKEN_MEDIA_QUERY,
} from "@/core/media-query"
import { useSmoothResize } from "@/shared/utils/useSmoothResizer"
import { FooterPanel, FooterPanelMobile } from "@/ui/features/footer"
import { HeaderPanel } from "@/ui/features/header"
import { SiderPanel } from "@/ui/features/sider"
import { Affix, Layout } from "antd"
import { type PropsWithChildren, useEffect, useRef, useState } from "react"
import { tap } from "rxjs"
import styles from "./layout.module.scss"

const { Header, Footer, Content, Sider } = Layout

export default function AppLayout({ children }: PropsWithChildren) {
  const mediaQueryService = useAppInject<MediaQueryService>(TOKEN_MEDIA_QUERY)

  const [isCollapsedSidebar, setCollapsedSidebar] = useState<boolean>(false)
  const [mediaQuery, setMediaQuery] = useState<MediaQueryState>(
    mediaQueryService.defaultState,
  )

  const headerRef = useRef(null)
  const headerAffixRef = useRef(null)
  const footerRef = useRef(null)

  useSmoothResize([headerRef, headerAffixRef, footerRef])

  useEffect(() => {
    const subscriber = mediaQueryService.state$
      .pipe(
        tap((state) => {
          setMediaQuery(state as any)
        }),
      )
      .subscribe()

    return () => subscriber.unsubscribe()
  }, [mediaQueryService])

  return (
    <Layout className={styles.layout}>
      {!(mediaQuery.xs || mediaQuery.sm) && (
        <>
          <Sider
            className={styles["sider-ghost"]}
            collapsible
            collapsed={isCollapsedSidebar}
            trigger={null}
          />
          <Sider
            className={styles.sider}
            collapsible
            collapsed={isCollapsedSidebar}
            trigger={null}
          >
            <div className={styles["sider-container"]}>
              <SiderPanel
                isCollapsed={isCollapsedSidebar}
                toggleMenu={() => setCollapsedSidebar(!isCollapsedSidebar)}
              />
            </div>
          </Sider>
        </>
      )}
      <Layout>
        <Header className={styles.header} ref={headerRef}>
          <Affix className={styles["header-affix"]} ref={headerAffixRef}>
            <div className={styles["header-inner"]}>
              <HeaderPanel />
            </div>
          </Affix>
        </Header>
        <Content className={styles.content}>{children}</Content>
        <Footer className={styles.footer}>
          {mediaQuery.xs || mediaQuery.sm ? (
            <FooterPanelMobile ref={footerRef} />
          ) : (
            <FooterPanel />
          )}
        </Footer>
      </Layout>
    </Layout>
  )
}
