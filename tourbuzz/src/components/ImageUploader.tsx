import { useQueryClient } from "react-query";
import { createRef } from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { ImageType } from "@src/types";

const ImageUploader = ({
    queryKey = "images",
    setImage
}: {
    queryKey?: string,
    setImage?: (props: ImageType) => void;
}) => {
    const ref = createRef<HTMLInputElement>()
    const queryClient = useQueryClient()

    const handleUploadClick = () => {
        if (ref.current) {
            ref.current.click();
        }
    };

    const uploadImage = async (file: Blob) => {
        const formData = new FormData();
        formData.append('file', file);

        return fetch(`${import.meta.env.VITE_API_URL}/admin/images`, {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                return response.json();
            })
            .then(data => {
                if (data.error) {
                    throw new Error(data.error);
                } else {
                    if (setImage) {
                        setImage(data)
                    }
                    return data;
                }
            })
            .catch(error => {
                throw new Error(error);
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
            <Button className="flex items-center gap-3" color="blue" onClick={handleUploadClick}>
                <CloudArrowUpIcon className="h-5 w-5" />
                Upload Image
            </Button>
            <input type="file" hidden multiple accept="image/*" ref={ref} onChange={handleUploadImage} />
        </>
    )
}

export default ImageUploader