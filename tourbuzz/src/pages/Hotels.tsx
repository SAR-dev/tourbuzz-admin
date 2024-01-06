import { useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import { Pagination } from "@src/components/Pagination";
import { HotelType } from "@src/constants/types";
import { toast } from "react-toastify";
import { deleteImageById, getHotels } from "@src/functions/api";
import Modal from "@src/components/Modal";
import PageHeader from "@src/components/PageHeader";
import DeleteButton from "@src/components/DeleteButton";
import { convertToNDigit } from "@src/functions/helpers";
import { Link } from "react-router-dom";
import TruncateText from "@src/components/TruncateText";
import { ArrowLeftIcon, PencilSquareIcon } from "@heroicons/react/16/solid";
import HotelCreateModal from "@src/components/HotelCreateModal";

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

const HotelRow = ({ hotel, setActiveHotel }: { hotel: HotelType, setActiveHotel: (props: HotelType) => void }) => {
    return (
        <tr>
            <th>{convertToNDigit(hotel.id, 4)}</th>
            <td className="w-64">{hotel.name}</td>
            <td>
                <Link to={hotel.map_link} target="_blank" className="link">
                    <TruncateText maxLength={30} text={hotel.map_link} />
                </Link>
            </td>
            <td>
                {hotel.website ? (
                    <Link to={hotel.website} target="_blank" className="link">
                        <TruncateText maxLength={30} text={hotel.website} />
                    </Link>
                ) : (
                    "No website adeed"
                )}
            </td>
            <td>{hotel.district.name}, {hotel.district.division.name}</td>
            <td>
                <div className="line-clamp-3">
                    {hotel.review}
                </div>
            </td>
            <td>
                <button className="btn btn-sm btn-outline" onClick={() => setActiveHotel(hotel)}>Edit</button>
            </td>
        </tr>
    )
}

const Hotels = () => {
    const [createOpen, setCreateOpen] = useState(false)
    const handleCreateOpen = () => setCreateOpen(false);

    const [loading, setLoading] = useState(false)
    const [activeHotel, setActiveHotel] = useState<HotelType | null>(null)
    const [pageSize, setPageSize] = useState(20)
    const [pageNo, setPageNo] = useState(1)
    const queryClient = useQueryClient()

    const handleOpen = () => setActiveHotel(null);

    const { isLoading, error, data } = useQuery<HotelData, Error>({
        queryKey: ['hotels', pageNo, pageSize],
        queryFn: () => getHotels({ pageNo, pageSize })
    })

    const deleteImage = async (id: number) => {
        setLoading(true)
        deleteImageById({ id: id }).then(res => {
            if (res.error) {
                toast.error("Delete failed 🤦‍♂️")
                setLoading(false)
            } else {
                toast.success("Deletion Requested 👌")
                setActiveHotel(null)
                queryClient.invalidateQueries(["images"])
                setLoading(false)
            }
        })
    }

    if (isLoading || error || !data) return;

    return (
        <div>
            <PageHeader
                title="Hotel List"
                subtitle="Let's upload some images and store them for later! 🎉"
                right={
                    <button className="btn btn-primary" onClick={() => setCreateOpen(true)}>
                        <PencilSquareIcon className="h-5 w-5" />
                        Register Hotel
                    </button>}
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
                            <HotelRow hotel={e} setActiveHotel={setActiveHotel} key={i} />
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

            {activeHotel && (
                <Modal width="50rem" title="Update Hotel" open={activeHotel != null} handleClose={handleOpen} footer={
                    <div className="w-full flex justify-between">
                        <button className="btn btn-outline" onClick={() => handleOpen}>
                            <ArrowLeftIcon className='h-5 w-5' />
                            Go Back
                        </button>
                        <div className="flex space-x-3">
                            <DeleteButton loading={loading} handleDelete={() => deleteImage(activeHotel.id)} />
                            <button className="btn" onClick={handleOpen}>Close</button>
                        </div>
                    </div>
                }>
                    <div className="flex flex-col space-y-3">

                    </div>
                </Modal>
            )}

            <HotelCreateModal open={createOpen} handleOpen={handleCreateOpen} />
        </div>
    )
}

export default Hotels