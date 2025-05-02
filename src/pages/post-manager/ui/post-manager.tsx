import { useEffect } from "react"

import { AddPostDialog, ModifyPostDialog } from "@features/posts"

import { Card, CardContent } from "@shared/ui"

import { useCommentsStore, usePostManagerStore, useUserStore } from "../model"
import { usePostManager } from "../model"
import { AddCommentDialog } from "./add-comment-dialog"
import { Header } from "./header"
import { ModifyCommentDialog } from "./modify-comment-dialog"
import { Pagination } from "./pagination"
import { PostDetailDialog } from "./post-detail-dialog"
import { PostTable } from "./post-table"
import { SearchFilterBar } from "./search-filter-bar"
import { UserInfoDialog } from "./user-info-dialog"

export const PostsManager = () => {
  const { fetchTags, loadPostsAndSyncUrl, syncStateWithUrlParams } = usePostManager()

  const { skip, limit, searchQuery, selectedTag, sortBy, sortOrder, loading } = usePostManagerStore()
  const { comments, setComments, selectedComment, setSelectedComment, newComment, setNewComment } = useCommentsStore()
  const { selectedUser } = useUserStore()

  useEffect(() => {
    fetchTags()
  }, [fetchTags])

  useEffect(() => {
    loadPostsAndSyncUrl()
  }, [skip, limit, sortBy, sortOrder, selectedTag])

  useEffect(() => {
    syncStateWithUrlParams()
  }, [location.search])

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <Header />

      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <SearchFilterBar />

          {/* 게시물 테이블 */}
          {loading ? <div className="flex justify-center p-4">로딩 중...</div> : <PostTable />}

          {/* 페이지네이션 */}
          <Pagination />
        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <AddPostDialog />

      {/* 게시물 수정 대화상자 */}
      <ModifyPostDialog />

      {/* 댓글 추가 대화상자 */}
      <AddCommentDialog newComment={newComment} setNewComment={setNewComment} setComments={setComments} />

      {/* 댓글 수정 대화상자 */}
      <ModifyCommentDialog
        selectedComment={selectedComment}
        setSelectedComment={setSelectedComment}
        setComments={setComments}
      />

      {/* 게시물 상세 보기 대화상자 */}
      <PostDetailDialog
        searchQuery={searchQuery}
        comments={comments}
        setNewComment={setNewComment}
        setSelectedComment={setSelectedComment}
        setComments={setComments}
      />

      {/* 사용자 모달 */}
      <UserInfoDialog selectedUser={selectedUser} />
    </Card>
  )
}
