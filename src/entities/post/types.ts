export interface Post {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: {
    likes: number
    dislikes: number
  }
  views: number
  userId: number
}

export interface PostResponse {
  posts: Post[]
  total: number
  skip: number
  limit: number
}

export interface CreatePostRequest {
  title: string
  body: string
  userId: number
}

export interface CreatePostResponse {
  id: number
  title: string
  body: string
  userId: number
}

export interface DeletePostResponse extends Post {
  isDeleted: boolean
  deletedOn: string
}
