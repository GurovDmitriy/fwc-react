"use client"

// order comment
import "reflect-metadata"
// order comment
import "@ant-design/v5-patch-for-react-19"
// order comment
import "../composition/styles/main.scss"
// order comment

import { MswProvider } from "@/__mock__/msw/MswProvider"
import { ContainerProvider } from "@/composition/container/client/ContainerProvider"
import StoreProvider from "@/composition/store/StoreProvider"
import AntdProvider from "@/core/antd/antd-provider"
import { AuthProvider } from "@/domains/auth"
import { ErrorBoundaryProvider } from "@/domains/error"
import { ErrorPage } from "@/ui/features/error-page"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"

export default function RootLayout({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient()

  return (
    <html lang="en">
      <body className="root">
        <MswProvider>
          <ContainerProvider>
            <AntdProvider>
              <ErrorBoundaryProvider fallback={<ErrorPage />}>
                <StoreProvider>
                  <AuthProvider>
                    <QueryClientProvider client={queryClient}>
                      {children}
                    </QueryClientProvider>
                  </AuthProvider>
                </StoreProvider>
              </ErrorBoundaryProvider>
            </AntdProvider>
          </ContainerProvider>
        </MswProvider>
      </body>
    </html>
  )
}
