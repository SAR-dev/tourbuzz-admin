import { getTours } from '@src/functions/api';
import { Pagination } from '@src/components/Pagination'
import { ListTourType } from '@src/types';
import { useState } from 'react'
import { useQuery } from 'react-query';
import PageHeader from '@src/components/PageHeader';
import { Link } from 'react-router-dom';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import NoResult from '@src/svg/NoResult';
import TourCard from '@src/components/TourCard';

interface TourData {
  data: {
    data: ListTourType[]
    page_no: number
    page_size: number
    has_prev: boolean
    has_next: boolean
    total_result: number
    total_pages: number
  }
}

const Tours = () => {
  const [pageSize, setPageSize] = useState(20)
  const [pageNo, setPageNo] = useState(1)

  const { isLoading, error, data } = useQuery<TourData, Error>({
    queryKey: ['tours', pageNo, pageSize],
    queryFn: () => getTours({ pageNo, pageSize })
  })

  if (isLoading || error || !data) return;

  return (
    <div>
      <PageHeader
        title="Tours Collection"
        subtitle="Let's upload some images and store them for later! 🎉"
        right={
          <Link className="btn btn-primary" to="/tours/create">
            <PaperAirplaneIcon className="h-5 w-5" />
            Create New Tour
          </Link>}
      />

      {data.data.data.length == 0 && (
        <div className="flex justify-center items-center p-10 w-full h-[60vh]">
          <div className="flex flex-col">
            <NoResult />
            <div className='text-center'>No result found</div>
          </div>
        </div>
      )}

      <div className='grid grid-cols-3 gap-5 my-5'>
        {data.data.data.map((e, i) => (
          <TourCard tour={e} key={i} />
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

export default Tours