import { create } from "zustand"

import { Comment } from "@entities/comment"

interface State {
  comments: Record<number, Comment[]>
  selectedComment: Comment | null
  newComment: { body: string; postId: number | null; userId: number }
}

interface Action {
  setComments: (comments: Record<number, Comment[]>) => void
  setSelectedComment: (selectedComment: Comment | null) => void
  setNewComment: (newComment: { body: string; postId: number | null; userId: number }) => void
}

const initialState: State = {
  comments: {},
  selectedComment: null,
  newComment: { body: "", postId: null, userId: 1 },
}

export const useCommentsStore = create<State & Action>((set) => ({
  ...initialState,
  setComments: (comments) => set({ comments }),
  setSelectedComment: (selectedComment) => set({ selectedComment }),
  setNewComment: (newComment) => set({ newComment }),
}))
