import { ExclamationCircleIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { Button, Dialog, Card, CardBody, CardFooter, Typography, Input, Textarea, Alert } from "@material-tailwind/react";
import { useState } from "react";
import ImageUploader from "./ImageUploader";
import { ImageType, parseErrorMessage } from "@src/types";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";
import { postWriter } from "@src/api";

const WriterUploader = ({ }: {}) => {
    const queryClient = useQueryClient()

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen((cur) => !cur);

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [about, setAbout] = useState("")
    const [avatar, setAvatar] = useState<ImageType | null>(null)

    const [error, setError] = useState("")

    const uploadWriter = async () => {
        if (!avatar){
            setError("Upload avatar.")
            throw Error()
        };
        return postWriter({
            images_id: avatar.id,
            email,
            name,
            username,
            about
        }).then(res => {
            if (res.error) {
                setError(parseErrorMessage(res.error).message)
                throw new Error()
            } else {
                handleOpen()
                return;
            }

        })
    }

    const handleUploadWriter = async () => {
        setError("")
        await toast.promise(
            uploadWriter(),
            {
                pending: 'Registering Writer',
                success: 'Writer Registered 👌',
                error: 'Registration Failed 🤯'
            }
        );
        queryClient.invalidateQueries("writers")
    };

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
                            <div className="h-full border flex items-center justify-center">
                                {avatar == null ? (
                                    <ImageUploader title="Upload Avatar" setImage={setAvatar} />
                                ) : (
                                    <img className="h-full object-cover rounded" src={avatar.source_url} alt="" />
                                )}
                            </div>
                            <div className="grid grid-cols-1 gap-5">
                                <Input value={email} onChange={e => setEmail(e.target.value)} label="Email" size="lg" crossOrigin="" />
                                <Input value={name} onChange={e => setName(e.target.value)} label="Name" size="lg" crossOrigin="" />
                                <Input value={username} onChange={e => setUsername(e.target.value)} label="Username" size="lg" crossOrigin="" />
                                <Textarea value={about} onChange={e => setAbout(e.target.value)} label="About" />
                            </div>
                        </div>

                    </CardBody>
                    <CardFooter className="pt-0">
                        <Alert icon={<ExclamationCircleIcon className="h-6 w-6" />} color="amber" className="mb-3" open={error.length > 0} onClose={() => setError("")}>
                            {error}
                        </Alert>
                        <Button variant="gradient" fullWidth onClick={handleUploadWriter}>
                            Register
                        </Button>
                    </CardFooter>
                </Card>
            </Dialog>
        </>
    )
}

export default WriterUploader