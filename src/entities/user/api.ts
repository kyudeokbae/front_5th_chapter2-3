import { UserResponse, UsersResponse } from "./types"

export const getUsers = async (): Promise<UsersResponse> => {
  const response = await fetch("/api/users?limit=0&select=username,image")

  if (!response.ok) {
    throw new Error("Failed to fetch users")
  }

  return response.json()
}

export const getUser = async (id: number): Promise<UserResponse> => {
  const response = await fetch(`/api/users/${id}`)

  if (!response.ok) {
    throw new Error("Failed to fetch user")
  }

  return response.json()
}
