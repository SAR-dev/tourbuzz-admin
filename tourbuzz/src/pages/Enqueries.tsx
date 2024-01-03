import EnquiryCard from "@src/components/EnquiryCard"
import PageHeader from "@src/components/PageHeader"
import { Pagination } from "@src/components/Pagination"
import { EnquiryType } from "@src/constants/types"
import { getEnquiries } from "@src/functions/api"
import { useState } from "react"
import FlipMove from "react-flip-move"
import { useQuery } from "react-query"

interface EnquiryData {
  data: {
    data: EnquiryType[]
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
        title="User Enquiries"
        subtitle="Let's upload some images and store them for later! 🎉"
      />

      <div className='grid grid-cols-1 border border-base-300 divide-y divide-base-300 my-5'>
        <FlipMove typeName={null}>
        {data.data.data.map((e, i) => (
          <EnquiryCard enquiry={e} key={e.id} />
        ))}
        </FlipMove>
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

export default Enqueries