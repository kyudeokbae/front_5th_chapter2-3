import { usePostManagerStore } from "../store"

export const usePagination = () => {
  const limit = usePostManagerStore((state) => state.limit)
  const setLimit = usePostManagerStore((state) => state.setLimit)
  const skip = usePostManagerStore((state) => state.skip)
  const setSkip = usePostManagerStore((state) => state.setSkip)
  const total = usePostManagerStore((state) => state.total)

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
