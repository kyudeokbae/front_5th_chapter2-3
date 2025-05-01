import { useCallback } from "react"

import { updatePost as updatePostApi } from "@entities/post"

import { usePostsStore } from "../store"

export const useModifyPost = () => {
  const posts = usePostsStore((state) => state.posts)
  const setPosts = usePostsStore((state) => state.setPosts)
  const selectedPost = usePostsStore((state) => state.selectedPost)
  const setSelectedPost = usePostsStore((state) => state.setSelectedPost)
  const setShowEditDialog = usePostsStore((state) => state.setShowEditDialog)

  // 게시물 업데이트
  const updatePost = useCallback(async () => {
    if (!selectedPost) return

    try {
      const data = await updatePostApi(selectedPost)
      setPosts(posts.map((post) => (post.id === data.id ? data : post)))
      setShowEditDialog(false)
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
    }
  }, [posts, selectedPost, setPosts, setShowEditDialog])

  const changeTitle = useCallback(
    (title: string) => {
      if (!selectedPost) return
      setSelectedPost({ ...selectedPost, title })
    },
    [selectedPost, setSelectedPost],
  )

  const changeBody = useCallback(
    (body: string) => {
      if (!selectedPost) return
      setSelectedPost({ ...selectedPost, body })
    },
    [selectedPost, setSelectedPost],
  )

  return { updatePost, changeTitle, changeBody }
}
