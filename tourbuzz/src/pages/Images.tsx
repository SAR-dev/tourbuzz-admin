import { useQuery, useQueryClient } from "react-query"
import { FaCircleCheck } from "react-icons/fa6";
import { createRef, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { RiUploadCloudLine } from "react-icons/ri";

interface ImageType {
    id: number;
    title: string;
    source_url: string;
    thumbnail_url: string;
    optimized_url: string;
    created_at: Date;
    updated_at: Date;
}

interface ImageData {
    data: ImageType[]
}

const Images = () => {
    const ref = createRef<HTMLInputElement>()
    const queryClient = useQueryClient()
    const { isLoading, error, data } = useQuery<ImageData, Error>(['images'], () =>
        fetch(`${import.meta.env.VITE_API_URL}/admin/images`).then(res =>
            res.json()
        )
    )
    const [selected, setSelected] = useState<number[]>([])

    const handleImageClick = (id: number) => {
        if (selected.includes(id)) {
            setSelected([...selected.filter(e => e != id)])
        } else {
            setSelected([...selected, id])
        }
    }

    const handleUploadClick = () => {
        if (ref.current) {
            ref.current.click();
        }
    };

    const handleUploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const formData = new FormData();
            formData.append('file', files[0]);

            await toast.promise(
                fetch(`${import.meta.env.VITE_API_URL}/admin/images`, {
                    method: 'POST',
                    body: formData,
                }),
                {
                    pending: 'Uploading image',
                    success: 'Image Uploaded 👌',
                    error: 'Upload Failed 🤯'
                }
            );
            queryClient.invalidateQueries(["images"])
        }
    };

    if (isLoading) return;

    return (
        <div>
            <div className="flex items-center justify-between bg-white p-3 rounded mb-3">
                <div className="text-left">
                    <h1 className="font-semibold text-gray-900 text-2xl">Welcome Back, Barry!</h1>
                    <p className="mt-1.5 text-sm text-gray-500">Let upload some images and sttore them for later! 🎉</p>
                </div>

                <div className="flex flex-row items-center">
                    <button
                        className="flex space-x-2 items-center rounded-lg bg-black px-5 py-3 text-sm font-medium transition bg-sky-500/50 text-black hover:bg-black hover:text-white focus:outline-none focus:ring"
                        type="button"
                        onClick={handleUploadClick}
                    >
                        <RiUploadCloudLine className="text-lg" />
                        <span>Upload Image</span>
                    </button>
                    <input type="file" hidden multiple accept="image/*" ref={ref} onChange={handleUploadImage} />
                </div>
            </div>
            <div className="grid grid-cols-8 gap-3">
                {data?.data.map((e, i) => (
                    <div className="w-full p-2 border rounded cursor-pointer bg-white hover:bg-sky-500/50 relative" onClick={() => handleImageClick(e.id)} key={i}>
                        <img className="w-full h-32 object-cover rounded" src={e.thumbnail_url} />
                        {selected.includes(e.id) && (
                            <div className="absolute p-4 left-0 bottom-0">
                                <FaCircleCheck className="text-2xl text-black" />
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    )
}

export default Images