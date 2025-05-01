import { useCallback } from "react"

import { usePostsStore } from "@features/posts"

import { getPostByTag, getPosts } from "@entities/post"
import { getTags, Tag } from "@entities/tag"
import { getUsers } from "@entities/user"

import { usePostManagerStore } from "../store"
import { SortBy, SortOrder } from "../types"
import { useUrlUpdater } from "./use-url-updater"

export const usePostManager = () => {
  const {
    setTotal,
    skip,
    setSkip,
    limit,
    setLimit,
    setSearchQuery,
    setSortBy,
    setSortOrder,
    setLoading,
    selectedTag,
    setSelectedTag,
    setTags,
  } = usePostManagerStore()
  const { setPosts } = usePostsStore()

  const updateURL = useUrlUpdater()

  // 게시물 가져오기

  // 게시물 가져오기
  const fetchPosts = useCallback(async () => {
    setLoading(true)

    try {
      const postsData = await getPosts(limit, skip)
      const usersData = await getUsers()
      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }))
      setPosts(postsWithUsers)
      setTotal(postsData.total)
    } catch (error) {
      console.error("게시물 가져오기 오류:", error)
    } finally {
      setLoading(false)
    }
  }, [limit, skip, setLoading, setPosts, setTotal])

  // 태그 가져오기
  const fetchTags = useCallback(async () => {
    try {
      const tagsData = await getTags()
      setTags(tagsData)
    } catch (error) {
      console.error("태그 가져오기 오류:", error)
    }
  }, [setTags])

  // 태그별 게시물 가져오기
  const fetchPostsByTag = useCallback(
    async (tag: string) => {
      setLoading(true)
      try {
        const [postsData, usersData] = await Promise.all([getPostByTag(tag), getUsers()])

        const postsWithUsers = postsData.posts.map((post) => ({
          ...post,
          author: usersData.users.find((user) => user.id === post.userId),
        }))

        setPosts(postsWithUsers)
        setTotal(postsData.total)
      } catch (error) {
        console.error("태그별 게시물 가져오기 오류:", error)
      } finally {
        setLoading(false)
      }
    },
    [setPosts, setTotal, setLoading],
  )

  const loadPostsAndSyncUrl = useCallback(() => {
    if (selectedTag && selectedTag !== "all") {
      fetchPostsByTag(selectedTag)
    } else {
      fetchPosts()
    }
    updateURL()
  }, [fetchPosts, fetchPostsByTag, selectedTag, updateURL])

  const syncStateWithUrlParams = useCallback(() => {
    const params = new URLSearchParams(location.search)
    setSkip(parseInt(params.get("skip") || "0"))
    setLimit(parseInt(params.get("limit") || "10"))
    setSearchQuery(params.get("search") || "")
    setSortBy((params.get("sortBy") as SortBy) || SortBy.NONE)
    setSortOrder((params.get("sortOrder") as SortOrder) || SortOrder.ASC)
    setSelectedTag((params.get("tag") as Tag["slug"]) || null)
  }, [setLimit, setSearchQuery, setSelectedTag, setSkip, setSortBy, setSortOrder])

  return { fetchPosts, fetchTags, fetchPostsByTag, loadPostsAndSyncUrl, syncStateWithUrlParams }
}
