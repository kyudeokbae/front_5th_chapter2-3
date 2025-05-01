import { Tag } from "./types"

export const getTags = async (): Promise<Tag[]> => {
  const response = await fetch("/api/posts/tags")

  if (!response.ok) {
    throw new Error("Failed to fetch tags")
  }

  return response.json()
}
