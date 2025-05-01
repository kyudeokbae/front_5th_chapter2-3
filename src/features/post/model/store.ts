import { create } from "zustand"

interface State {
  showAddDialog: boolean
  showEditDialog: boolean
  showPostDetailDialog: boolean
}

interface Action {
  setShowAddDialog: (isShow: boolean) => void
  setShowEditDialog: (isShow: boolean) => void
  setShowPostDetailDialog: (isShow: boolean) => void
}

const initialState: State = {
  showAddDialog: false,
  showEditDialog: false,
  showPostDetailDialog: false,
}

export const usePostModals = create<State & Action>((set) => ({
  ...initialState,
  setShowAddDialog: (isShow) => set({ showAddDialog: isShow }),
  setShowEditDialog: (isShow) => set({ showEditDialog: isShow }),
  setShowPostDetailDialog: (isShow) => set({ showPostDetailDialog: isShow }),
}))
