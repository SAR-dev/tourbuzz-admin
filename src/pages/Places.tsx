import { PencilSquareIcon } from '@heroicons/react/16/solid'
import { getPlaces } from '@src/functions/api';
import PageHeader from '@src/components/PageHeader'
import { Pagination } from '@src/components/Pagination'
import { PlaceType } from '@src/types';
import { useState } from 'react'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom'
import PlaceCard from '@src/components/PlaceCard';
import NoResult from '@src/svg/NoResult';
import { PLACE } from '@src/constants/headers';

interface PlacesData {
  data: {
    data: PlaceType[]
    page_no: number
    page_size: number
    has_prev: boolean
    has_next: boolean
    total_result: number
    total_pages: number
  }
}

const Places = () => {
  const [pageSize, setPageSize] = useState(20)
  const [pageNo, setPageNo] = useState(1)

  const { isLoading, error, data } = useQuery<PlacesData, Error>({
    queryKey: ['places', pageNo, pageSize],
    queryFn: () => getPlaces({ pageNo, pageSize })
  })

  if (isLoading || error || !data) return;

  return (
    <div>
      <PageHeader
        title={PLACE.title}
        subtitle={PLACE.subtitle}
        right={
          <Link className="btn btn-primary" to="/places/create">
            <PencilSquareIcon className="h-5 w-5" />
            Create New Venue
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

      <div className='grid grid-cols-4 gap-5 my-5'>
        {data.data.data.map((e, i) => (
          <PlaceCard place={e} key={i} />
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

export default Places