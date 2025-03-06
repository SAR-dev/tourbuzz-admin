import EnquiryCard from "@src/components/EnquiryCard"
import PageHeader from "@src/components/PageHeader"
import { Pagination } from "@src/components/Pagination"
import { EnquiryListType } from "@src/types";
import { getEnquiries } from "@src/functions/api"
import NoResult from "@src/svg/NoResult";
import { useState } from "react"
import FlipMove from "react-flip-move"
import { useQuery } from "react-query"
import { ENQUERY } from "@src/constants/headers";

interface EnquiryData {
  data: {
    data: EnquiryListType[]
    page_no: number
    page_size: number
    has_prev: boolean
    has_next: boolean
    total_result: number
    total_pages: number
  }
}

const Enqueries = () => {
  const [pageSize, setPageSize] = useState(20)
  const [pageNo, setPageNo] = useState(1)

  const { isLoading, error, data } = useQuery<EnquiryData, Error>({
    queryKey: ['enquiries', pageNo, pageSize],
    queryFn: () => getEnquiries({ pageNo, pageSize })
  })

  if (isLoading || error || !data) return;

  return (
    <div>
      <PageHeader
        title={ENQUERY.title}
        subtitle={ENQUERY.subtitle}
      />

      {data.data.data.length == 0 && (
        <div className="flex justify-center items-center p-10 w-full h-[60vh]">
          <div className="flex flex-col">
            <NoResult />
            <div className='text-center'>No result found</div>
          </div>
        </div>
      )}

      {data.data.data.length != 0 && (
        <div className='grid grid-cols-1 border border-base-300 divide-y divide-base-300 my-5'>
          <FlipMove typeName={null}>
            {data.data.data.map((e) => (
              <EnquiryCard enquiry={e} key={e.user.id} />
            ))}
          </FlipMove>
        </div>
      )}

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

export default Enqueries