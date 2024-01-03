import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import EnquiryCard from "@src/components/EnquiryCard"
import { EnquiryType } from "@src/constants/types"
import { getEnquiriesByUser } from "@src/functions/api";
import { useQuery } from "react-query"
import { Link, useParams } from "react-router-dom"

interface EnqueriesByUserData {
  data: EnquiryType[]
}

const EnqueriesByUser = () => {
  let { userId } = useParams()

  const { isLoading, error, data } = useQuery<EnqueriesByUserData, Error>({
    queryKey: ['user_enquiries', userId],
    queryFn: () => getEnquiriesByUser({id: Number(userId)})
  })

  if (isLoading || error || !data) return;

  return (
    <div>
      <Link className="btn" to="/enqueries">
        <ArrowLeftIcon className="h-5 w-5" />
        Back
      </Link>

      <div className='grid grid-cols-1 border border-base-300 divide-y divide-base-300 my-5'>
        {data.data.map((e, i) => (
          <EnquiryCard enquiry={e} disableHistory={true} key={i} />
        ))}
      </div>

    </div>
  )
}

export default EnqueriesByUser