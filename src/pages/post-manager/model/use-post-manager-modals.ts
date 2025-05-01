import { create } from "zustand"

interface State {
  showAddDialog: boolean
  showEditDialog: boolean
  showAddCommentDialog: boolean
  showEditCommentDialog: boolean
  showPostDetailDialog: boolean
  showUserModal: boolean
}

interface Action {
  setShowAddDialog: (isShow: boolean) => void
  setShowEditDialog: (isShow: boolean) => void
  setShowAddCommentDialog: (isShow: boolean) => void
  setShowEditCommentDialog: (isShow: boolean) => void
  setShowPostDetailDialog: (isShow: boolean) => void
  setShowUserModal: (isShow: boolean) => void
}

const initialState: State = {
  showAddDialog: false,
  showEditDialog: false,
  showAddCommentDialog: false,
  showEditCommentDialog: false,
  showPostDetailDialog: false,
  showUserModal: false,
}

export const usePostManagerModals = create<State & Action>((set) => ({
  ...initialState,
  setShowAddDialog: (isShow) => set({ showAddDialog: isShow }),
  setShowEditDialog: (isShow) => set({ showEditDialog: isShow }),
  setShowAddCommentDialog: (isShow) => set({ showAddCommentDialog: isShow }),
  setShowEditCommentDialog: (isShow) => set({ showEditCommentDialog: isShow }),
  setShowPostDetailDialog: (isShow) => set({ showPostDetailDialog: isShow }),
  setShowUserModal: (isShow) => set({ showUserModal: isShow }),
}))
