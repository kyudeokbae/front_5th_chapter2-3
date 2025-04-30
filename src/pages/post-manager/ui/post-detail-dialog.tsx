import { Comments } from "@widgets/comments"

import { highlightText } from "@shared/lib"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@shared/ui"

export const PostDetailDialog = ({
  showPostDetailDialog,
  setShowPostDetailDialog,
  selectedPost,
  searchQuery,
  comments,
  setNewComment,
  setShowAddCommentDialog,
  setSelectedComment,
  setShowEditCommentDialog,
  setComments,
}) => {
  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(selectedPost?.body, searchQuery)}</p>
          <Comments
            comments={comments}
            postId={selectedPost?.id}
            searchQuery={searchQuery}
            setNewComment={setNewComment}
            setShowAddCommentDialog={setShowAddCommentDialog}
            setSelectedComment={setSelectedComment}
            setShowEditCommentDialog={setShowEditCommentDialog}
            setComments={setComments}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
