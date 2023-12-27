import { useQueryClient } from "react-query";
import { createRef, useState } from "react";
import { CloudArrowUpIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { ImageType } from "@src/types";
import { postImage } from "@src/api";

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
            const file = files[0]
            postImage(file).then(res => {
                if (res.error) {
                    toast.error("Upload failed 🤦‍♂️")
                    setLoading(false)
                } else {
                    if (setImage) {
                        setImage(res.data)
                    }
                    queryClient.invalidateQueries([queryKey])
                    setLoading(false)
                    toast.success("Image uploaded 💪")
                }
    
            })
        }
        
    }
    
    return (
        <>
            <Button fullWidth className="flex items-center justify-center gap-3" color="blue" onClick={handleUploadClick} loading={loading} disabled={disabled}>
                <CloudArrowUpIcon className="h-5 w-5" />
                {title}
            </Button>
            <input type="file" hidden multiple accept="image/*" ref={ref} onChange={uploadImage} />
        </>
    )
}

export default ImageUploader