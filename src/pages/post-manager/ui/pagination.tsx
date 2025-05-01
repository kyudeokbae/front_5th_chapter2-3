import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/ui"

import { usePagination, usePostsStore } from "../model"

export const Pagination = () => {
  const limit = usePostsStore((state) => state.limit)

  const { changeLimit, isDisableNext, isDisablePrev, next, prev } = usePagination()

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <Select value={limit.toString()} onValueChange={changeLimit}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="30">30</SelectItem>
          </SelectContent>
        </Select>
        <span>항목</span>
      </div>
      <div className="flex gap-2">
        <Button disabled={isDisablePrev} onClick={prev}>
          이전
        </Button>
        <Button disabled={isDisableNext} onClick={next}>
          다음
        </Button>
      </div>
    </div>
  )
}
