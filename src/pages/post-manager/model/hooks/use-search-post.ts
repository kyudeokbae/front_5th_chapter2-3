import { useCallback } from "react"

import { searchPosts } from "@entities/post"

import { usePostsStore } from "../store"
import { usePostManager } from "./use-post-manager"
import { useUrlUpdater } from "./use-url-updater"

export const useSearchPost = () => {
  const searchQuery = usePostsStore((state) => state.searchQuery)
  const setPosts = usePostsStore((state) => state.setPosts)
  const setTotal = usePostsStore((state) => state.setTotal)
  const setLoading = usePostsStore((state) => state.setLoading)
  const setSelectedTag = usePostsStore((state) => state.setSelectedTag)

  const { fetchPosts, fetchPostsByTag } = usePostManager()
  const updateURL = useUrlUpdater()
  // 게시물 검색
  const searchPostsByQuery = useCallback(async () => {
    if (!searchQuery) {
      fetchPosts()
      return
    }
    setLoading(true)
    try {
      const data = await searchPosts(searchQuery)
      setPosts(data.posts)
      setTotal(data.total)
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    }
    setLoading(false)
  }, [fetchPosts, searchQuery, setPosts, setTotal, setLoading])

  const searchPostsByTag = useCallback(
    (tag: string) => {
      setSelectedTag(tag)
      fetchPostsByTag(tag)
      updateURL()
    },
    [fetchPostsByTag, setSelectedTag, updateURL],
  )

  return { searchPostsByQuery, searchPostsByTag }
}
