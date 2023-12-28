import { getWriters } from '@src/api'
import PageHeader from '@src/components/PageHeader'
import { Pagination } from '@src/components/Pagination'
import { WriterCard } from '@src/components/WriterCard'
import WriterUploader from '@src/components/WriterUploader'
import { WriterType } from '@src/types'
import { useState } from 'react'
import { useQuery } from 'react-query';

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

  const { isLoading, error, data } = useQuery<WriterData, Error>(['writers', pageNo, pageSize], () =>
    getWriters({ pageNo, pageSize })
  )

  if (isLoading || error || !data) return;

  return (
    <div>
      <PageHeader title="Writers Profiles" subtitle="Let's upload some images and store them for later! 🎉" right={<WriterUploader />} />
      <div className='grid grid-cols-2 gap-5 my-5'>
        {data.data.data.map((e, i) => (
          <WriterCard writer={e} key={i} />
        ))}
      </div>

      <div>
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