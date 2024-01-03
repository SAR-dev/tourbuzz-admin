import { PencilSquareIcon } from '@heroicons/react/16/solid'
import { getWriters } from '@src/functions/api'
import PageHeader from '@src/components/PageHeader'
import { Pagination } from '@src/components/Pagination'
import WriterCard from '@src/components/WriterCard'
import { WriterType } from '@src/constants/types'
import { useState } from 'react'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom'

interface OrganizersData {
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

function Organizers() {
  const [pageSize, setPageSize] = useState(20)
  const [pageNo, setPageNo] = useState(1)

  const { isLoading, error, data } = useQuery<OrganizersData, Error>({
    queryKey: ['writers', pageNo, pageSize],
    queryFn: () => getWriters({ pageNo, pageSize })
  })

  if (isLoading || error || !data) return;

  return (
    <div>
      <PageHeader
        title="Organizers Profiles"
        subtitle="Let's upload some images and store them for later! 🎉"
        right={
          <Link className="btn btn-primary" to="/organizers/create">
            <PencilSquareIcon className="h-5 w-5" />
            Create Organizer
          </Link>}
      />

      <div className='grid grid-cols-3 gap-5 my-5'>
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

export default Organizers