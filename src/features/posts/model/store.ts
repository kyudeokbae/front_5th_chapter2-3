import { create } from "zustand"

import { Post } from "@entities/post"

import { PostWithAuthor } from "./types"

interface State {
  posts: PostWithAuthor[]
  selectedPost: Post | null
  showAddDialog: boolean
  showEditDialog: boolean
  showPostDetailDialog: boolean
}

interface Action {
  setPosts: (posts: PostWithAuthor[]) => void
  setSelectedPost: (post: Post | null) => void
  setShowAddDialog: (isShow: boolean) => void
  setShowEditDialog: (isShow: boolean) => void
  setShowPostDetailDialog: (isShow: boolean) => void
}

const initialState: State = {
  posts: [],
  selectedPost: null,
  showAddDialog: false,
  showEditDialog: false,
  showPostDetailDialog: false,
}

export const usePostsStore = create<State & Action>((set) => ({
  ...initialState,
  setPosts: (posts) => set({ posts }),
  setSelectedPost: (post) => set({ selectedPost: post }),
  setShowAddDialog: (isShow) => set({ showAddDialog: isShow }),
  setShowEditDialog: (isShow) => set({ showEditDialog: isShow }),
  setShowPostDetailDialog: (isShow) => set({ showPostDetailDialog: isShow }),
}))
