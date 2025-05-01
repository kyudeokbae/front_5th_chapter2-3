import {
  Comment,
  CreateCommentRequest,
  CreateCommentResponse,
  DeleteCommentResponse,
  GetPostCommentsResponse,
} from "./types"

export const createComment = async (newComment: CreateCommentRequest): Promise<CreateCommentResponse> => {
  const response = await fetch("/api/comments/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newComment),
  })

  if (!response.ok) {
    throw new Error("Failed to create comment")
  }

  return response.json()
}

export const updateComment = async (selectedComment: Comment): Promise<Comment> => {
  const response = await fetch(`/api/comments/${selectedComment.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body: selectedComment.body }),
  })

  if (!response.ok) {
    throw new Error("Failed to update comment")
  }

  return response.json()
}

export const deleteComment = async (id: number): Promise<DeleteCommentResponse> => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("Failed to delete comment")
  }

  return response.json()
}

export const patchCommentLikes = async (id: number, likes: number): Promise<Comment> => {
  const response = await fetch(`/api/comments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ likes }),
  })

  if (!response.ok) {
    throw new Error("Failed to like comment")
  }

  return response.json()
}

export const getPostComments = async (postId: number): Promise<GetPostCommentsResponse> => {
  const response = await fetch(`/api/comments/post/${postId}`)

  if (!response.ok) {
    throw new Error("Failed to get comments")
  }

  return response.json()
}
