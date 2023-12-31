import { useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import ImageUploader from "@src/components/ImageUploader";
import CopyCode from "@src/components/CopyCode";
import { Pagination } from "@src/components/Pagination";
import { ImageType } from "@src/constants/types";
import { toast } from "react-toastify";
import { deleteImageById, getImages } from "@src/functions/api";
import Modal from "@src/components/Modal";
import PageHeader from "@src/components/PageHeader";
import DeleteButton from "@src/components/DeleteButton";

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

const Gallery = () => {
    const [loading, setLoading] = useState(false)
    const [activeImage, setActiveImage] = useState<ImageType | null>(null)
    const [pageSize, setPageSize] = useState(20)
    const [pageNo, setPageNo] = useState(1)
    const queryClient = useQueryClient()

    const handleOpen = () => setActiveImage(null);

    const { isLoading, error, data } = useQuery<ImageData, Error>({
        queryKey: ['images', pageNo, pageSize],
        queryFn: () => getImages({ pageNo, pageSize })
    })

    const deleteImage = async (id: number) => {
        setLoading(true)
        deleteImageById({ id: id }).then(res => {
            if (res.error) {
                toast.error("Delete failed 🤦‍♂️")
                setLoading(false)
            } else {
                toast.success("Deletion Requested 👌")
                setActiveImage(null)
                queryClient.invalidateQueries(["images"])
                setLoading(false)
            }
        })
    }

    if (isLoading || error || !data) return;

    return (
        <div>
            <PageHeader title="Image Gallery" subtitle="Let's upload some images and store them for later! 🎉" right={<ImageUploader />} />
            <div className="grid grid-cols-6 gap-5 my-5">
                {data.data.data.map((e, i) => (
                    <div className="card cursor-pointer bg-base-200 hover:bg-base-300 p-3" onClick={() => setActiveImage(e)} key={i}>
                        <img
                            className="card h-40 w-full max-w-full object-cover object-center"
                            src={e.thumbnail_url}
                            alt="gallery-photo"
                        />
                    </div>
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

            {activeImage && (
                <Modal title="Image Actions" open={activeImage != null} handleClose={handleOpen} footer={
                    <div className="w-full flex space-x-3">
                        <DeleteButton loading={loading} handleDelete={() => deleteImage(activeImage.id)} />
                        <CopyCode text={activeImage?.source_url} />
                        <button className="btn" onClick={handleOpen}>Close</button>
                    </div>
                }>
                    <div className="flex flex-col space-y-3">
                        <div className="min-h-32 w-full flex justify-center">
                            <img className="card h-96" src={activeImage?.source_url} alt="" />
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    )
}

export default Gallery