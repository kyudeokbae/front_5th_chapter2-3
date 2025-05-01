import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

import { usePostsStore } from "../store"

export const useUrlUpdater = () => {
  const navigate = useNavigate()
  const skip = usePostsStore((state) => state.skip)
  const limit = usePostsStore((state) => state.limit)
  const searchQuery = usePostsStore((state) => state.searchQuery)
  const sortBy = usePostsStore((state) => state.sortBy)
  const sortOrder = usePostsStore((state) => state.sortOrder)
  const selectedTag = usePostsStore((state) => state.selectedTag)

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
