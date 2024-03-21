import { useQuery } from "react-query";
import { useState } from "react";
import { Pagination } from "@src/components/Pagination";
import { TicketType } from "@src/types";
import { getTickets } from "@src/functions/api";
import PageHeader from "@src/components/PageHeader";
import NoResult from "@src/svg/NoResult";
import { TICKET } from "@src/constants/headers";
import TicketCard from "@src/components/TicketCard";

interface TicketData {
    data: {
        data: TicketType[]
        page_no: number
        page_size: number
        has_prev: boolean
        has_next: boolean
        total_result: number
        total_pages: number
    }
}

const Tickets = () => {
    const [pageSize, setPageSize] = useState(20)
    const [pageNo, setPageNo] = useState(1)

    const { isLoading, error, data } = useQuery<TicketData, Error>({
        queryKey: ['tickets', pageNo, pageSize],
        queryFn: () => getTickets({ pageNo, pageSize })
    })

    if (isLoading || error || !data) return;

    return (
        <div>
            <PageHeader
                title={TICKET.title}
                subtitle={TICKET.subtitle}
            />

            {data.data.data.length == 0 && (
                <div className="flex justify-center items-center p-10 w-full h-[60vh]">
                    <div className="flex flex-col">
                        <NoResult />
                        <div className='text-center'>No result found</div>
                    </div>
                </div>
            )}

            <div className='grid grid-cols-1 gap-5 my-5'>
                {data.data.data.map((e, i) => (
                    <TicketCard ticket={e} key={i} />
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
                    page_sizes={[30, 60, 100]}
                />
            </div>
        </div>
    )
}

export default Tickets