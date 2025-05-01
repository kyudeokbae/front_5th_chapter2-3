import { getPostComments } from "@entities/comment"
import { deletePost } from "@entities/post"
import { getUser, User } from "@entities/user"

import { useCommentsStore, usePostManagerModals, usePostManagerStore, useUserStore } from "../store"
import { useUrlUpdater } from "./use-url-updater"

import { PostWithAuthor, usePostsStore } from "@/features/posts"

export const usePostTable = () => {
  const setPosts = usePostsStore((state) => state.setPosts)
  const posts = usePostsStore((state) => state.posts)
  const setSelectedPost = usePostsStore((state) => state.setSelectedPost)
  const setSelectedTag = usePostManagerStore((state) => state.setSelectedTag)
  const setComments = useCommentsStore((state) => state.setComments)
  const comments = useCommentsStore((state) => state.comments)

  const setSelectedUser = useUserStore((state) => state.setSelectedUser)

  const setShowPostDetailDialog = usePostManagerModals((state) => state.setShowPostDetailDialog)
  const setShowUserModal = usePostManagerModals((state) => state.setShowUserModal)

  const updateURL = useUrlUpdater()

  const handleDeletePost = async (id: number) => {
    try {
      await deletePost(id)
      setPosts(posts.filter((post) => post.id !== id))
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  }

  // 댓글 가져오기
  const fetchComments = async (postId: number) => {
    if (comments[postId]) return // 이미 불러온 댓글이 있으면 다시 불러오지 않음
    try {
      const data = await getPostComments(postId)
      setComments({ ...comments, [postId]: data.comments })
    } catch (error) {
      console.error("댓글 가져오기 오류:", error)
    }
  }

  // 게시물 상세 보기
  const openPostDetail = (post: PostWithAuthor) => {
    setSelectedPost(post)
    fetchComments(post.id)
    setShowPostDetailDialog(true)
  }

  // 사용자 모달 열기
  const openUserModal = async (user?: User) => {
    if (!user) return

    try {
      const userData = await getUser(user.id)
      setSelectedUser(userData)
      setShowUserModal(true)
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }

  const updateTag = (tag: string) => {
    setSelectedTag(tag)
    updateURL()
  }

  return {
    handleDeletePost,
    openPostDetail,
    openUserModal,
    updateTag,
  }
}
