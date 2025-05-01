import { usePostsStore } from "../store"

export const usePagination = () => {
  const limit = usePostsStore((state) => state.limit)
  const setLimit = usePostsStore((state) => state.setLimit)
  const skip = usePostsStore((state) => state.skip)
  const setSkip = usePostsStore((state) => state.setSkip)
  const total = usePostsStore((state) => state.total)

  const isDisableNext = skip + limit >= total
  const isDisablePrev = skip === 0

  const changeLimit = (value: string) => {
    setLimit(Number(value))
  }

  const next = () => {
    if (isDisableNext) return
    setSkip(skip + limit)
  }

  const prev = () => {
    if (isDisablePrev) return
    setSkip(skip - limit)
  }

  return {
    isDisableNext,
    isDisablePrev,
    changeLimit,
    next,
    prev,
  }
}
