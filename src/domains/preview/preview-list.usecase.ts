"use client"

import { useAppInject } from "@/composition/container/client/ContainerProvider"
import { ErrorService, TOKEN_ERROR_SERVICE } from "@/core/error"
import { useQuery } from "@tanstack/react-query"
import { PreviewApiService } from "./internal"
import type { Preview } from "./types"

export const usePreviewListUsecase = () => {
  const previewService = useAppInject<PreviewApiService>(PreviewApiService)
  const errorService = useAppInject<ErrorService>(TOKEN_ERROR_SERVICE)

  const { isPending, data } = useQuery<Preview[]>({
    queryKey: ["previewList"],
    queryFn: async () => {
      try {
        const list = await previewService.list()
        return list.data.data.map((item) => ({
          ...item,
          image: `images/${item.image}`,
        }))
      } catch (error) {
        throw errorService.handle(error)
      }
    },
  })

  return {
    isPending,
    data,
  }
}
