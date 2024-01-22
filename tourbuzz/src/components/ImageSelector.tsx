import { useQuery } from "react-query";
import { useState } from "react";
import { ImageType } from "@src/types";
import { ArrowLeftIcon, CheckCircleIcon, CheckIcon } from "@heroicons/react/24/outline";
import { getImages } from "@src/functions/api";
import Modal from "./Modal";
import NoResult from "@src/svg/NoResult";
import { Pagination } from "./Pagination";

interface ImageData {
    data: {
        data: ImageType[]
        page_no: number
        page_size: number
        has_prev: boolean
        has_next: boolean
        total_result: number
        total_pages: number
    }
}

const ImageSelector = ({
    setImage,
    title = "Choose Image",
    disabled
}: {
    setImage?: (props: ImageType) => void,
    title?: string,
    disabled?: boolean
}) => {
    const [selectedImage, setSelectedImage] = useState<ImageType | null>(null)
    const [pageSize, setPageSize] = useState(20)
    const [pageNo, setPageNo] = useState(1)
    const [showModal, setShowModal] = useState(false)

    const { data } = useQuery<ImageData, Error>({
        queryKey: ['images', pageNo, pageSize],
        queryFn: () => getImages({ pageNo, pageSize })
    })

    const openShowModal = () => {
        setSelectedImage(null)
        setShowModal(true)
    }

    const closeShowModal = () => {
        setSelectedImage(null)
        setShowModal(false)
    }

    const handleSelected = () => {
        if (selectedImage && setImage) {
            setImage(selectedImage)
        }
        closeShowModal()
    }


    return (
        <>
            <button className="btn btn-primary w-full" onClick={openShowModal} disabled={disabled}>
                <CheckCircleIcon className="h-5 w-5" />
                {title}
            </button>

            <Modal width='60rem' maxWidth='60rem' open={showModal} handleClose={closeShowModal} title="Select Image" footer={
                <div className='flex w-full justify-between'>
                    <button className="btn" onClick={closeShowModal}>
                        <ArrowLeftIcon className='h-5 w-5' />
                        Go Back</button>
                    <button className="btn btn-info" onClick={handleSelected}>
                        <CheckIcon className='h-5 w-5' />
                        Choose Selected</button>
                </div>
            }>
                <div>
                    <div className="w-full h-[25rem] overflow-y-auto custom-scrollbar">
                        {data && (
                            <>
                                {data.data.data.length == 0 ? (
                                    <div className="flex justify-center items-center p-10 w-full h-full">
                                        <div className="flex flex-col">
                                            <NoResult />
                                            <div className='text-center'>No result found</div>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="grid grid-cols-5 gap-5">
                                            {data.data.data.map((e, i) => (
                                                <div className="card cursor-pointer bg-base-200 hover:bg-base-300 p-3 relative" onClick={() => setSelectedImage(e)} key={i}>
                                                    <img
                                                        className="card h-32 w-full object-cover object-center"
                                                        src={e.thumbnail_url}
                                                    />
                                                    {selectedImage?.id == e.id && (
                                                        <div className="absolute top-0 left-0 m-1">
                                                            <div className="flex justify-center items-center bg-primary rounded-full p-1">
                                                                <CheckCircleIcon className='h-5 w-5 text-primary-content' />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    <div>
                        {data && (
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
                        )}
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ImageSelector