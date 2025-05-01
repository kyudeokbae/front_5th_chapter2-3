import { CreatePostRequest, CreatePostResponse, DeletePostResponse, Post, PostResponse } from "./types"

export const getPosts = async (limit: number, skip: number): Promise<PostResponse> => {
  const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)

  if (!response.ok) {
    throw new Error("Failed to fetch posts")
  }

  return response.json()
}

export const getPostByTag = async (tag: string): Promise<PostResponse> => {
  const response = await fetch(`/api/posts/tag/${tag}`)

  if (!response.ok) {
    throw new Error("Failed to fetch posts by tag")
  }

  return response.json()
}

export const createPost = async (newPost: CreatePostRequest): Promise<CreatePostResponse> => {
  const response = await fetch("/api/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  })

  if (!response.ok) {
    throw new Error("Failed to create post")
  }

  return response.json()
}

export const updatePost = async (selectedPost: Post): Promise<Post> => {
  const response = await fetch(`/api/posts/${selectedPost.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(selectedPost),
  })

  if (!response.ok) {
    throw new Error("Failed to update post")
  }

  return response.json()
}

export const deletePost = async (id: number): Promise<DeletePostResponse> => {
  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("Failed to delete post")
  }

  return response.json()
}

export const searchPosts = async (searchQuery: string): Promise<PostResponse> => {
  const response = await fetch(`/api/posts/search?q=${searchQuery}`)

  if (!response.ok) {
    throw new Error("Failed to search posts")
  }

  return response.json()
}
