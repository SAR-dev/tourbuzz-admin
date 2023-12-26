import { useQueryClient } from "react-query";
import { createRef } from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { ImageType } from "@src/types";
import { postImage } from "@src/api";

const ImageUploader = ({
    queryKey = "images",
    setImage,
    title = "Upload Image"
}: {
    queryKey?: string,
    setImage?: (props: ImageType) => void,
    title?: string
}) => {
    const ref = createRef<HTMLInputElement>()
    const queryClient = useQueryClient()

    const handleUploadClick = () => {
        if (ref.current) {
            ref.current.click();
        }
    };

    const uploadImage = async (file: Blob) => {
        return postImage(file).then(res => {
            if (res.error) {
                throw new Error()
            } else {
                if (setImage) {
                    setImage(res.data)
                }
            }

        })
    }

    const handleUploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {

            await toast.promise(
                uploadImage(files[0]),
                {
                    pending: 'Uploading image',
                    success: 'Image Uploaded 👌',
                    error: 'Upload Failed 🤯'
                }
            );
            queryClient.invalidateQueries([queryKey])
        }
    };
    
    return (
        <>
            <Button fullWidth className="flex items-center justify-center gap-3" color="blue" onClick={handleUploadClick}>
                <CloudArrowUpIcon className="h-5 w-5" />
                {title}
            </Button>
            <input type="file" hidden multiple accept="image/*" ref={ref} onChange={handleUploadImage} />
        </>
    )
}

export default ImageUploader