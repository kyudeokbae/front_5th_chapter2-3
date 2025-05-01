import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { getPostByTag, getPosts } from "@entities/post"
import { getTags, Tag } from "@entities/tag"
import { getUsers } from "@entities/user"

import { Card, CardContent } from "@shared/ui"

import { useCommentsStore, usePostsStore, useUserStore } from "../model"
import { SortBy, SortOrder } from "../model/types"
import { AddCommentDialog } from "./add-comment-dialog"
import { AddPostDialog } from "./add-post-dialog"
import { Header } from "./header"
import { ModifyCommentDialog } from "./modify-comment-dialog"
import { ModifyPostDialog } from "./modify-post-dialog"
import { Pagination } from "./pagination"
import { PostDetailDialog } from "./post-detail-dialog"
import { PostTable } from "./post-table"
import { SearchFilterBar } from "./search-filter-bar"
import { UserInfoDialog } from "./user-info-dialog"

export const PostsManager = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const {
    posts,
    setPosts,
    total,
    setTotal,
    skip,
    setSkip,
    limit,
    setLimit,
    searchQuery,
    setSearchQuery,
    selectedPost,
    setSelectedPost,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    loading,
    setLoading,
    tags,
    setTags,
    selectedTag,
    setSelectedTag,
  } = usePostsStore()
  const { comments, setComments, selectedComment, setSelectedComment, newComment, setNewComment } = useCommentsStore()
  const { selectedUser, setSelectedUser } = useUserStore()

  // URL 업데이트 함수
  const updateURL = () => {
    const params = new URLSearchParams()
    if (skip) params.set("skip", skip.toString())
    if (limit) params.set("limit", limit.toString())
    if (searchQuery) params.set("search", searchQuery)
    if (sortBy) params.set("sortBy", sortBy)
    if (sortOrder) params.set("sortOrder", sortOrder)
    if (selectedTag) params.set("tag", selectedTag)
    navigate(`?${params.toString()}`)
  }

  // 게시물 가져오기
  const fetchPosts = async () => {
    setLoading(true)

    try {
      const postsData = await getPosts(limit, skip)
      const usersData = await getUsers()
      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }))
      setPosts(postsWithUsers)
      setTotal(postsData.total)
    } catch (error) {
      console.error("게시물 가져오기 오류:", error)
    } finally {
      setLoading(false)
    }
  }

  // 태그 가져오기
  const fetchTags = async () => {
    try {
      const tagsData = await getTags()
      setTags(tagsData)
    } catch (error) {
      console.error("태그 가져오기 오류:", error)
    }
  }

  // 태그별 게시물 가져오기
  const fetchPostsByTag = async (tag?: string) => {
    if (!tag || tag === "all") {
      fetchPosts()
      return
    }
    setLoading(true)
    try {
      const [postsData, usersData] = await Promise.all([getPostByTag(tag), getUsers()])

      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }))

      setPosts(postsWithUsers)
      setTotal(postsData.total)
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchTags()
  }, [])

  useEffect(() => {
    if (selectedTag) {
      fetchPostsByTag(selectedTag)
    } else {
      fetchPosts()
    }
    updateURL()
  }, [skip, limit, sortBy, sortOrder, selectedTag])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setSkip(parseInt(params.get("skip") || "0"))
    setLimit(parseInt(params.get("limit") || "10"))
    setSearchQuery(params.get("search") || "")
    setSortBy((params.get("sortBy") as SortBy) || SortBy.NONE)
    setSortOrder((params.get("sortOrder") as SortOrder) || SortOrder.ASC)
    setSelectedTag((params.get("tag") as Tag["slug"]) || null)
  }, [location.search])

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <Header />

      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <SearchFilterBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
            fetchPostsByTag={fetchPostsByTag}
            updateURL={updateURL}
            tags={tags}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            fetchPosts={fetchPosts}
            setPosts={setPosts}
            setLoading={setLoading}
            setTotal={setTotal}
          />

          {/* 게시물 테이블 */}
          {loading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostTable
              posts={posts}
              searchQuery={searchQuery}
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
              updateURL={updateURL}
              setSelectedPost={setSelectedPost}
              setPosts={setPosts}
              comments={comments}
              setComments={setComments}
              setSelectedUser={setSelectedUser}
            />
          )}

          {/* 페이지네이션 */}
          <Pagination limit={limit} setLimit={setLimit} skip={skip} setSkip={setSkip} total={total} />
        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <AddPostDialog posts={posts} setPosts={setPosts} />

      {/* 게시물 수정 대화상자 */}
      <ModifyPostDialog
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
        posts={posts}
        setPosts={setPosts}
      />

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
        selectedPost={selectedPost}
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
