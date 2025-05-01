export interface CommentUser {
  id: number
  fullName: string
  username: string
}

export interface Comment {
  id: number
  body: string
  likes: number
  postId: number
  user: CommentUser
}

export interface GetPostCommentsResponse {
  comments: Comment[]
  limit: number
  skip: number
  total: number
}

export interface CreateCommentRequest {
  body: string
  postId: number
  userId: number
}

export interface CreateCommentResponse {
  id: number
  body: string
  postId: number
  user: CommentUser
}

export interface UpdateCommentRequest {
  body: string
}

export interface DeleteCommentResponse extends Comment {
  isDeleted: boolean
  deletedOn: string
}
