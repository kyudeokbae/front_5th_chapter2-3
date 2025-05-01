import { useCallback, useState } from "react"

import { createPost } from "@entities/post"

import { usePostsStore } from "../store"
import { PostWithAuthor } from "../types"

export const useAddPost = (posts: PostWithAuthor[], setPosts: (posts: PostWithAuthor[]) => void) => {
  const [newPost, setNewPost] = useState({ title: "", body: "", userId: 1 })
  const setShowAddDialog = usePostsStore((state) => state.setShowAddDialog)

  // 게시물 추가
  const addPost = useCallback(async () => {
    try {
      const data = await createPost(newPost)
      // @ts-expect-error: author에 user 추가
      setPosts([data, ...posts])
      setShowAddDialog(false)
      setNewPost({ title: "", body: "", userId: 1 })
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  }, [newPost, posts, setPosts, setShowAddDialog])

  const changeTitle = useCallback(
    (title: string) => {
      setNewPost({ ...newPost, title })
    },
    [newPost, setNewPost],
  )

  const changeBody = useCallback(
    (body: string) => {
      setNewPost({ ...newPost, body })
    },
    [newPost, setNewPost],
  )

  const changeUserId = useCallback(
    (userId: string) => {
      setNewPost({ ...newPost, userId: Number(userId) })
    },
    [newPost, setNewPost],
  )

  return { addPost, changeTitle, changeBody, changeUserId, newPost }
}
