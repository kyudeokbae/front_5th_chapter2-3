import { Post } from "@entities/post"
import { User } from "@entities/user"

export const SortBy = {
  NONE: "none",
  ID: "id",
  TITLE: "title",
  REACTIONS: "reactions",
} as const

export type SortBy = (typeof SortBy)[keyof typeof SortBy]

export const SortOrder = {
  ASC: "asc",
  DESC: "desc",
} as const

export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]

export interface PostWithAuthor extends Post {
  author?: User
}
