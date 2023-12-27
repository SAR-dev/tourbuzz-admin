import { PencilSquareIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Button, Dialog, Card, CardBody, CardFooter, Typography, Input, Textarea } from "@material-tailwind/react";
import { useState } from "react";
import ImageUploader from "./ImageUploader";
import { ImageType, parseErrorMessage } from "@src/types";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";
import { postWriter } from "@src/api";
import ErrorAlert from "./ErrorAlert";

interface WriterUploaderState {
    email: string
    name: string
    username: string
    about: string
    avatar: ImageType | null
}

const initialWriterUploaderState: WriterUploaderState = {
    email: "",
    name: "",
    username: "",
    about: "",
    avatar: null
}

const WriterUploader = () => {
    const [loading, setLoading] = useState(false)
    const queryClient = useQueryClient()
    const [data, setData] = useState<WriterUploaderState>({ ...initialWriterUploaderState })
    const [error, setError] = useState("")

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setError("")
        setOpen((cur) => !cur)
    };

    const uploadWriter = async () => {
        if (!data.avatar) {
            setError("Upload avatar.")
            return;
        };
        setError("")
        setLoading(true)
        postWriter({
            images_id: data.avatar.id,
            email: data.email,
            name: data.name,
            username: data.username,
            about: data.about
        }).then(res => {
            if (res.error) {
                toast.error("Registration failed 🤦‍♂️")
                setError(parseErrorMessage(res.error).message)
                setLoading(false)
            } else {
                toast.success("Writer Registered 💪")
                queryClient.invalidateQueries("writers")
                setLoading(false)
                setData({ ...initialWriterUploaderState })
                handleOpen();
            }

        })
    }

    const setAvatar = (image: ImageType) => {
        setData({ ...data, avatar: image })
    }

    return (
        <>
            <Button className="flex items-center gap-3" color="blue" onClick={handleOpen}>
                <PencilSquareIcon className="h-5 w-5" />
                Create Writer Profile
            </Button>

            <Dialog
                size="lg"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full">
                    <CardBody className="flex flex-col">
                        <Typography variant="h4" color="blue-gray">
                            Create Writer
                        </Typography>
                        <Typography
                            className="mb-3 font-normal"
                            variant="paragraph"
                            color="gray"
                        >
                            Provide details to register a writer
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
                            Register
                        </Button>
                    </CardFooter>
                </Card>
            </Dialog>
        </>
    )
}

export default WriterUploader