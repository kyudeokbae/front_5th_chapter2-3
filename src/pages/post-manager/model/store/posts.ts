import { create } from "zustand"

import { Tag } from "@entities/tag"

import { SortBy, SortOrder } from "../types"

interface State {
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

export const usePostManagerStore = create<State & Action>((set) => ({
  ...initialState,
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
