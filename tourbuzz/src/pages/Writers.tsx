import { getWriters } from '@src/api'
import { Pagination } from '@src/components/Pagination'
import WriterUploader from '@src/components/WriterUploader'
import { WriterType } from '@src/types'
import { useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'

interface WriterData {
  data: {
    data: WriterType[]
    page_no: number
    page_size: number
    has_prev: boolean
    has_next: boolean
    total_result: number
    total_pages: number
  }
}

function Writers() {
  const [pageSize, setPageSize] = useState(20)
  const [pageNo, setPageNo] = useState(1)
  const queryClient = useQueryClient()

  const { isLoading, error, data } = useQuery<WriterData, Error>(['writers', pageNo, pageSize], () =>
    getWriters({ pageNo, pageSize })
  )

  if (isLoading || error || !data) return;

  return (
    <div>
      <div className="flex items-center justify-between bg-white p-5 rounded mb-5">
        <div className="text-left">
          <h1 className="font-semibold text-gray-900 text-2xl">Writers Profiles</h1>
          <p className="mt-1.5 text-sm text-gray-500">Let's upload some images and store them for later! 🎉</p>
        </div>

        <div className="flex flex-row items-center">
          <WriterUploader />
        </div>
      </div>

      <div className="mt-5">
        <Pagination
          page_no={data.data.page_no}
          page_size={data.data.page_size}
          has_prev={data.data.has_prev}
          has_next={data.data.has_next}
          total_result={data.data.total_result}
          total_pages={data.data.total_pages}
          setPageSize={setPageSize}
          setPageNo={setPageNo}
        />
      </div>
    </div>
  )
}

export default Writers