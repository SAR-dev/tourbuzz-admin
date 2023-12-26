import { useQuery } from "react-query";
import { FaCircleCheck } from "react-icons/fa6";
import { useState } from "react";
import { ToastContainer } from 'react-toastify';
import ImageUploader from "@src/components/ImageUploader";

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

    if (isLoading) return;

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
                    <div className="relative cursor-pointer" onClick={() => handleImageClick(e.id)} key={i}>
                        <img
                            className="h-40 w-full max-w-full rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/5"
                            src={e.thumbnail_url}
                            alt="gallery-photo"
                        />
                        {selected.includes(e.id) && (
                            <div className="absolute p-4 left-0 bottom-0">
                                <FaCircleCheck className="text-2xl text-black" />
                            </div>
                        )}
                    </div>
                ))}
            </div>
            
        </div>
    )
}

export default Images