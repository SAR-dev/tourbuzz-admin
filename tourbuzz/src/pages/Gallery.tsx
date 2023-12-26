import { useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import ImageUploader from "@src/components/ImageUploader";
import { Button, Dialog } from "@material-tailwind/react";
import CopyCode from "@src/components/CopyCode";
import { Pagination } from "@src/components/Pagination";
import { ImageType } from "@src/types";
import { toast } from "react-toastify";
import { deleteImageById, getImages } from "@src/api";

interface ImageData {
    data: ImageType[]
    page_no: number
    page_size: number
    has_prev: boolean
    has_next: boolean
    total_result: number
    total_pages: number
}

const Gallery = () => {
    const [activeImage, setActiveImage] = useState<ImageType | null>(null)
    const [pageSize, setPageSize] = useState(20)
    const [pageNo, setPageNo] = useState(1)
    const queryClient = useQueryClient()

    const handleOpen = () => setActiveImage(null);

    const { isLoading, error, data } = useQuery<ImageData, Error>(['images', pageNo, pageSize], () =>
        getImages({ pageNo, pageSize })
    )

    const deleteImage = async (id: number) => {
        return deleteImageById({ id: id }).then(res => {
            if (res.error) {
                throw new Error()
            } else {
                setActiveImage(null)
            }
        })
    }

    const handleDeleteImage = async (id: number) => {
        await toast.promise(
            deleteImage(id),
            {
                pending: 'Deleting image',
                success: 'Image Deletion Requested 👌',
                error: 'Deletion Failed 🤯'
            }
        );
        queryClient.invalidateQueries(["images"])
    };

    if (isLoading || error || !data) return;

    return (
        <div>
            <div className="flex items-center justify-between bg-white p-5 rounded mb-5">
                <div className="text-left">
                    <h1 className="font-semibold text-gray-900 text-2xl">Image Gallery</h1>
                    <p className="mt-1.5 text-sm text-gray-500">Let's upload some images and store them for later! 🎉</p>
                </div>

                <div className="flex flex-row items-center">
                    <ImageUploader queryKey="images" />
                </div>
            </div>
            <div className="grid grid-cols-6 gap-5">
                {data?.data.map((e, i) => (
                    <div className="cursor-pointer" onClick={() => setActiveImage(e)} key={i}>
                        <img
                            className="h-40 w-full max-w-full rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/5"
                            src={e.thumbnail_url}
                            alt="gallery-photo"
                        />
                    </div>
                ))}
            </div>
            <div className="mt-5">
                <Pagination
                    page_no={data.page_no}
                    page_size={data.page_size}
                    has_prev={data.has_prev}
                    has_next={data.has_next}
                    total_result={data.total_result}
                    total_pages={data.total_pages}
                    setPageSize={setPageSize}
                    setPageNo={setPageNo}
                />
            </div>
            <Dialog
                size="xl"
                open={activeImage != null}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <div className="flex flex-col items-center justify-center bg-white p-4 rounded w-fit mx-auto relative">
                    <img className="h-96 rounded" src={activeImage?.source_url} alt="" />
                    <div className="flex space-x-1 text-xs p-1 rounded mt-4 w-full">
                        {activeImage && <CopyCode text={activeImage?.source_url} />}
                        {activeImage && (
                            <Button color="red" onClick={() => handleDeleteImage(activeImage.id)}>
                                Delete
                            </Button>
                        )}
                        <Button className="ml-auto" color="blue" onClick={handleOpen}>
                            Close
                        </Button>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}

export default Gallery