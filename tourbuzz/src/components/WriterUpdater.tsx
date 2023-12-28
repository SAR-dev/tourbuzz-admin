import { Button, Dialog, Card, CardBody, CardFooter, Typography, Input, Textarea } from "@material-tailwind/react";
import { useState } from "react";
import ImageUploader from "./ImageUploader";
import { ImageType, parseErrorMessage } from "@src/constants/types";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";
import { putWriter } from "@src/functions/api";
import ErrorAlert from "./ErrorAlert";
import { WriterType } from "@src/constants/types";
import { UserCircleIcon } from "@heroicons/react/16/solid";

const WriterUpdater = ({ open, setOpen, writer }: { open: boolean, setOpen: (props: boolean) => void, writer: WriterType }) => {
    const [loading, setLoading] = useState(false)
    const queryClient = useQueryClient()
    const [error, setError] = useState("")
    const [data, setData] = useState<WriterType>({ ...writer })
    const handleOpen = () => {
        setError("")
        setOpen(false)
    };

    const uploadWriter = async () => {
        if (!data.avatar) {
            setError("Upload avatar.")
            return;
        };
        setError("")
        setLoading(true)
        putWriter({
            writers_id: data.id,
            images_id: data.avatar.id,
            email: data.email,
            name: data.name,
            username: data.username,
            about: data.about
        }).then(res => {
            if (res.error) {
                toast.error("Update failed 🤦‍♂️")
                setError(parseErrorMessage(res.error).message)
                setLoading(false)
            } else {
                toast.success("Writer updated 💪")
                queryClient.invalidateQueries("writers")
                setLoading(false)
                setOpen(false)
            }
        })
    }

    const setAvatar = (image: ImageType) => {
        setData({ ...data, avatar: image })
    }

    return (
        <Dialog
            size="lg"
            open={open}
            handler={handleOpen}
            className="bg-transparent shadow-none"
        >
            <Card className="mx-auto w-full">
                <CardBody className="flex flex-col">
                    <Typography variant="h4" color="blue-gray">
                        Update Writer Profile
                    </Typography>
                    <Typography
                        className="mb-3 font-normal"
                        variant="paragraph"
                        color="gray"
                    >
                        Update details of a writer
                    </Typography>
                    <div className="grid grid-cols-2 gap-5">
                        <div className="h-full flex flex-col space-y-3 items-center justify-center">
                            <div className="h-80 w-full border rounded flex justify-center items-center">
                                {data.avatar ? (
                                    <img className="h-80 w-full object-cover rounded" src={data.avatar.source_url} alt="" />
                                ) : (
                                    <UserCircleIcon className="h-20 w-20" />
                                )}
                            </div>
                            <ImageUploader title="Upload Avatar" setImage={setAvatar} />
                        </div>
                        <div className="grid grid-cols-1 gap-5">
                            <Input value={data.email} onChange={e => setData({ ...data, email: e.target.value })} label="Email" size="lg" crossOrigin="" />
                            <Input value={data.name} onChange={e => setData({ ...data, name: e.target.value })} label="Name" size="lg" crossOrigin="" />
                            <Input value={data.username} onChange={e => setData({ ...data, username: e.target.value })} label="Username" size="lg" crossOrigin="" />
                            <Textarea value={data.about} onChange={e => setData({ ...data, about: e.target.value })} rows={8} label="About" />
                        </div>
                    </div>

                </CardBody>
                <CardFooter className="pt-0">
                    {error.length > 0 && (
                        <div className="mb-3">
                            <ErrorAlert error={error} setError={setError} />
                        </div>
                    )}
                    <Button className="flex justify-center" fullWidth onClick={uploadWriter} loading={loading}>
                        Update
                    </Button>
                </CardFooter>
            </Card>
        </Dialog>
    )
}

export default WriterUpdater