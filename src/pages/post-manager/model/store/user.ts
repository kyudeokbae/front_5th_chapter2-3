import { create } from "zustand"

import { User } from "@entities/user"

interface State {
  selectedUser: User | null
}

interface Action {
  setSelectedUser: (selectedUser: User | null) => void
}

const initialState: State = {
  selectedUser: null,
}

export const useUserStore = create<State & Action>((set) => ({
  ...initialState,
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}))
