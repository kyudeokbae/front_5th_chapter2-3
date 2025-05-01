import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "@shared/ui"

import { PostWithAuthor, useAddPost } from "../model"
import { usePostModals } from "../model/store"

interface AddPostDialogProps {
  posts: PostWithAuthor[]
  setPosts: (posts: PostWithAuthor[]) => void
}

export const AddPostDialog = ({ posts, setPosts }: AddPostDialogProps) => {
  const showAddDialog = usePostModals((state) => state.showAddDialog)
  const setShowAddDialog = usePostModals((state) => state.setShowAddDialog)

  const { addPost, changeTitle, changeBody, changeUserId, newPost } = useAddPost(posts, setPosts)

  return (
    <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input placeholder="제목" value={newPost.title} onChange={(e) => changeTitle(e.target.value)} />
          <Textarea rows={30} placeholder="내용" value={newPost.body} onChange={(e) => changeBody(e.target.value)} />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={newPost.userId}
            onChange={(e) => changeUserId(e.target.value)}
          />
          <Button onClick={addPost}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
