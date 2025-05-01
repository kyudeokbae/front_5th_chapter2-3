import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "@shared/ui"

import { useModifyPost } from "../model"
import { usePostsStore } from "../model/store"

export const ModifyPostDialog = () => {
  const selectedPost = usePostsStore((state) => state.selectedPost)
  const showEditDialog = usePostsStore((state) => state.showEditDialog)
  const setShowEditDialog = usePostsStore((state) => state.setShowEditDialog)
  const { updatePost, changeTitle, changeBody } = useModifyPost()

  return (
    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input placeholder="제목" value={selectedPost?.title || ""} onChange={(e) => changeTitle(e.target.value)} />
          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPost?.body || ""}
            onChange={(e) => changeBody(e.target.value)}
          />
          <Button onClick={updatePost}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
