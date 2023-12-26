import { Button, Dialog, Card, CardBody, CardFooter, Typography, Input, Textarea } from "@material-tailwind/react";
import { useState } from "react";
import ImageUploader from "./ImageUploader";
import { ImageType, parseErrorMessage } from "@src/types";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";
import { putWriter } from "@src/api";
import ErrorAlert from "./ErrorAlert";
import { WriterType } from "@src/types";

const WriterUpdater = ({ open, setOpen, writer }: { open: boolean, setOpen: (props: boolean) => void, writer: WriterType }) => {
    const queryClient = useQueryClient()

    const [data, setData] = useState<WriterType>({ ...writer })
    const handleOpen = () => {
        setError("")
        setOpen(false)
    };
    const [error, setError] = useState("")

    const uploadWriter = async () => {
        if (!data.avatar) {
            setError("Upload avatar.")
            throw Error()
        };
        return putWriter({
            writers_id: data.id,
            images_id: data.avatar.id,
            email: data.email,
            name: data.name,
            username: data.username,
            about: data.about
        }).then(res => {
            if (res.error) {
                setError(parseErrorMessage(res.error).message)
                throw new Error()
            } else {
                setOpen(false)
                return;
            }
        })
    }

    const handleUploadWriter = async () => {
        setError("")
        await toast.promise(
            uploadWriter(),
            {
                pending: 'Updating Writer',
                success: 'Writer Updated 👌',
                error: 'Update Failed 🤯'
            }
        );
        queryClient.invalidateQueries("writers")
    };

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
                        <div className="h-full border flex flex-col space-y-3 items-center justify-center">
                            {data.avatar && (
                                <img className="h-80 w-full object-cover rounded" src={data.avatar.source_url} alt="" />
                            )}
                            <ImageUploader title="Upload Avatar" setImage={setAvatar} />
                        </div>
                        <div className="grid grid-cols-1 gap-5">
                            <Input value={data.email} onChange={e => setData({ ...data, email: e.target.value })} label="Email" size="lg" crossOrigin="" />
                            <Input value={data.name} onChange={e => setData({ ...data, name: e.target.value })} label="Name" size="lg" crossOrigin="" />
                            <Input value={data.username} onChange={e => setData({ ...data, username: e.target.value })} label="Username" size="lg" crossOrigin="" />
                            <Textarea value={data.about} onChange={e => setData({ ...data, about: e.target.value })} label="About" />
                        </div>
                    </div>

                </CardBody>
                <CardFooter className="pt-0">
                    <div className="mb-3">
                        <ErrorAlert error={error} setError={setError} />
                    </div>
                    <Button fullWidth onClick={handleUploadWriter}>
                        Update
                    </Button>
                </CardFooter>
            </Card>
        </Dialog>
    )
}

export default WriterUpdater