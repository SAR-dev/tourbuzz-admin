import { useQuery } from "react-query";
import { useState } from "react";
import ImageUploader from "@src/components/ImageUploader";
import { Dialog } from "@material-tailwind/react";

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
    const [active, setActive] = useState<ImageType | null>(null)
    
    const handleOpen = () => setActive(null);

    const { isLoading, error, data } = useQuery<ImageData, Error>(['images'], () =>
        fetch(`${import.meta.env.VITE_API_URL}/admin/images`).then(res =>
            res.json()
        )
    )

    if (isLoading || error) return;

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
                    <div className="cursor-pointer" onClick={() => setActive(e)} key={i}>
                        <img
                            className="h-40 w-full max-w-full rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/5"
                            src={e.thumbnail_url}
                            alt="gallery-photo"
                        />
                    </div>
                ))}
            </div>
            <Dialog
                size="lg"
                open={active != null}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <img className="h-[128] w-full object-contain" src={active?.source_url} alt="" />
            </Dialog>
        </div>
    )
}

export default Images