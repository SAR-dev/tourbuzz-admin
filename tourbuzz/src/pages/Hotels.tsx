import { useQuery } from "react-query";
import { useState } from "react";
import { Pagination } from "@src/components/Pagination";
import { HotelType } from "@src/constants/types";
import { getHotels } from "@src/functions/api";
import PageHeader from "@src/components/PageHeader";
import { Link } from "react-router-dom";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
import HotelRow from "@src/components/HotelRow";

interface HotelData {
    data: {
        data: HotelType[]
        page_no: number
        page_size: number
        has_prev: boolean
        has_next: boolean
        total_result: number
        total_pages: number
    }
}

const Hotels = () => {
    const [pageSize, setPageSize] = useState(20)
    const [pageNo, setPageNo] = useState(1)

    const { isLoading, error, data } = useQuery<HotelData, Error>({
        queryKey: ['hotels', pageNo, pageSize],
        queryFn: () => getHotels({ pageNo, pageSize })
    })

    if (isLoading || error || !data) return;

    return (
        <div>
            <PageHeader
                title="Hotel List"
                subtitle="Let's upload some images and store them for later! 🎉"
                right={
                    <Link className="btn btn-primary" to="/hotels/create">
                        <PencilSquareIcon className="h-5 w-5" />
                        Register Hotel
                    </Link>}
            />

            <div className="overflow-x-auto border border-base-300 card mt-5 mb-1">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Map Link</th>
                            <th>Website</th>
                            <th>District</th>
                            <th>Review</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.data.data.map((e, i) => (
                            <HotelRow hotel={e} key={i} />
                        ))}
                    </tbody>
                </table>
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
                    page_sizes={[30, 60, 100]}
                />
            </div>
        </div>
    )
}

export default Hotels