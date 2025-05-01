import { create } from "zustand"

import { Post } from "@entities/post"
import { Tag } from "@entities/tag"

import { SortBy, SortOrder } from "../types"

import { PostWithAuthor } from "@/features/post"

interface State {
  posts: PostWithAuthor[]
  selectedPost: Post | null
  total: number
  skip: number
  limit: number
  searchQuery: string
  sortBy: SortBy
  sortOrder: SortOrder
  loading: boolean
  tags: Tag[]
  selectedTag: Tag["slug"] | null
}

interface Action {
  setPosts: (posts: PostWithAuthor[]) => void
  setSelectedPost: (post: Post | null) => void
  setTotal: (total: number) => void
  setSkip: (skip: number) => void
  setLimit: (limit: number) => void
  setSearchQuery: (searchQuery: string) => void
  setSortBy: (sortBy: SortBy) => void
  setSortOrder: (sortOrder: SortOrder) => void
  setLoading: (loading: boolean) => void
  setTags: (tags: Tag[]) => void
  setSelectedTag: (selectedTag: Tag["slug"] | null) => void
}

const initialState: State = {
  posts: [],
  selectedPost: null,
  total: 0,
  skip: 0,
  limit: 10,
  searchQuery: "",
  sortBy: SortBy.NONE,
  sortOrder: SortOrder.ASC,
  loading: false,
  tags: [],
  selectedTag: null,
}

export const usePostsStore = create<State & Action>((set) => ({
  ...initialState,
  setPosts: (posts) => set({ posts }),
  setSelectedPost: (post) => set({ selectedPost: post }),
  setTotal: (total) => set({ total }),
  setSkip: (skip) => set({ skip }),
  setLimit: (limit) => set({ limit }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  setLoading: (loading) => set({ loading }),
  setTags: (tags) => set({ tags }),
  setSelectedTag: (selectedTag) => set({ selectedTag }),
}))
