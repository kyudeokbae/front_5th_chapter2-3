import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

import { usePostManagerStore } from "../store"

export const useUrlUpdater = () => {
  const navigate = useNavigate()
  const skip = usePostManagerStore((state) => state.skip)
  const limit = usePostManagerStore((state) => state.limit)
  const searchQuery = usePostManagerStore((state) => state.searchQuery)
  const sortBy = usePostManagerStore((state) => state.sortBy)
  const sortOrder = usePostManagerStore((state) => state.sortOrder)
  const selectedTag = usePostManagerStore((state) => state.selectedTag)

  return useCallback(() => {
    const urlParams = {
      skip,
      limit,
      searchQuery,
      sortBy,
      sortOrder,
      selectedTag,
    }
    const searchParams = new URLSearchParams()

    Object.entries(urlParams).forEach(([key, val]) => {
      if (val !== null && val !== undefined && val !== "") {
        searchParams.set(key, String(val))
      }
    })
    navigate(`?${searchParams.toString()}`)
  }, [navigate, skip, limit, searchQuery, sortBy, sortOrder, selectedTag])
}
