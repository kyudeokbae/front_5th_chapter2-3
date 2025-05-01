import { Post } from "@entities/post"
import { User } from "@entities/user"

export interface PostWithAuthor extends Post {
  author?: User
}
