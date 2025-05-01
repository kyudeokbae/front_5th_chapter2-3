import { create } from "zustand"

interface State {
  showEditDialog: boolean
  showAddCommentDialog: boolean
  showEditCommentDialog: boolean
  showPostDetailDialog: boolean
  showUserModal: boolean
}

interface Action {
  setShowEditDialog: (isShow: boolean) => void
  setShowAddCommentDialog: (isShow: boolean) => void
  setShowEditCommentDialog: (isShow: boolean) => void
  setShowPostDetailDialog: (isShow: boolean) => void
  setShowUserModal: (isShow: boolean) => void
}

const initialState: State = {
  showEditDialog: false,
  showAddCommentDialog: false,
  showEditCommentDialog: false,
  showPostDetailDialog: false,
  showUserModal: false,
}

export const usePostManagerModals = create<State & Action>((set) => ({
  ...initialState,
  setShowEditDialog: (isShow) => set({ showEditDialog: isShow }),
  setShowAddCommentDialog: (isShow) => set({ showAddCommentDialog: isShow }),
  setShowEditCommentDialog: (isShow) => set({ showEditCommentDialog: isShow }),
  setShowPostDetailDialog: (isShow) => set({ showPostDetailDialog: isShow }),
  setShowUserModal: (isShow) => set({ showUserModal: isShow }),
}))
