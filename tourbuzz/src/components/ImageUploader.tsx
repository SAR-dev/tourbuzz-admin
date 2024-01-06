import { useQueryClient } from "react-query";
import { createRef, useState } from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { ImageType } from "@src/constants/types";
import { postImage } from "@src/functions/api";
import Compressor from 'compressorjs';

const ImageUploader = ({
    queryKey = "images",
    setImage,
    title = "Upload Image",
    disabled
}: {
    queryKey?: string,
    setImage?: (props: ImageType) => void,
    title?: string,
    disabled?: boolean
}) => {
    const [loading, setLoading] = useState(false)
    const ref = createRef<HTMLInputElement>()
    const queryClient = useQueryClient()

    const handleUploadClick = () => {
        if (ref.current) {
            ref.current.click();
        }
    };

    const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setLoading(true)
            const file = files[0];
            new Compressor(file, {
                strict: true,
                checkOrientation: true,
                maxWidth: 3000,
                maxHeight: 1980,
                resize: "contain",
                quality: 0.8,
                drew(context, canvas) {
                    context.fillStyle = '#fff';
                    context.font = `${canvas.height * .03}px sans-serif`;
                    context.fillText(`©${import.meta.env.VITE_APP_NAME}`, 20, canvas.height - 20);
                },
                success(result) {
                    postImage(result, file.name).then(res => {
                        if (res.error) {
                            toast.error("Upload failed 🤦‍♂️");
                            setLoading(false);
                        } else {
                            if (setImage) setImage(res.data);
                            queryClient.invalidateQueries([queryKey]);
                            setLoading(false);
                            toast.success("Image uploaded 💪")
                        }
                    })
                },
                error(err) {
                    console.log(err.message);
                    toast.error("Upload failed 🤦‍♂️")
                    setLoading(false)
                },
            });
        }

    }

    return (
        <>
            <button className="btn btn-primary w-full" onClick={handleUploadClick} disabled={disabled || loading}>
                {loading ? (
                    <>
                        <span className="loading loading-spinner"></span>
                        Uploading
                    </>
                ) : (
                    <>
                        <CloudArrowUpIcon className="h-5 w-5" />
                        {title}
                    </>
                )}
            </button>
            <input type="file" hidden multiple accept="image/*" ref={ref} onChange={uploadImage} />
        </>
    )
}

export default ImageUploader