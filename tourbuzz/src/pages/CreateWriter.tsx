import { ArrowLeftIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { ImageType, parseErrorMessage } from "@src/types";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";
import { postWriter } from "@src/functions/api";
import ImageUploader from "@src/components/ImageUploader";
import PageHeader from "@src/components/PageHeader";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "@src/components/ErrorAlert";
import Image from "@src/components/Image";

interface CreateWriterState {
    email: string
    name: string
    username: string
    about: string
    avatar: ImageType | null
    contact_no: string
    website: string
}

const CreateWriter = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const queryClient = useQueryClient()
    const [data, setData] = useState<CreateWriterState>({
        email: "",
        name: "",
        username: "",
        about: "",
        avatar: null,
        contact_no: "",
        website: ""
    })
    const [error, setError] = useState("")

    const handleSubmit = async () => {
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
            about: data.about,
            contact_no: data.contact_no,
            website: data.website
        }).then(res => {
            if (res.error) {
                toast.error("Registration failed 🤦‍♂️")
                setError(parseErrorMessage(res.error).message)
                setLoading(false)
            } else {
                toast.success("Writer Registered 💪")
                queryClient.invalidateQueries("writers")
                setLoading(false)
                navigate("/writers")
            }

        })
    }

    const setAvatar = (image: ImageType) => {
        setData({ ...data, avatar: image })
    }

    return (
        <div className="grid grid-cols-1 gap-5">
            <PageHeader
                title="Writers Profiles"
                subtitle="Let's upload some images and store them for later! 🎉"
            />

            <div className="w-[70rem] bg-base-200 card p-5">
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="label">Email</label>
                        <input value={data.email} onChange={e => setData({ ...data, email: e.target.value })} type="text" placeholder="Email" className="input input-bordered w-full" />
                    </div>
                    <div>
                        <label className="label">Phone no</label>
                        <input value={data.contact_no} onChange={e => setData({ ...data, contact_no: e.target.value })} type="text" placeholder="Phone No" className="input input-bordered w-full" />
                    </div>
                    <div>
                        <label className="label">Name</label>
                        <input value={data.name} onChange={e => setData({ ...data, name: e.target.value })} type="text" placeholder="Name" className="input input-bordered w-full" />
                    </div>
                    <div>
                        <label className="label">Username</label>
                        <input value={data.username} onChange={e => setData({ ...data, username: e.target.value })} type="text" placeholder="Username" className="input input-bordered w-full" />
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                        <div>
                            <label className="label">Website</label>
                            <input value={data.website} onChange={e => setData({ ...data, website: e.target.value })} type="text" placeholder="Website" className="input input-bordered w-full" />
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="label">About</label>
                            <textarea value={data.about} onChange={e => setData({ ...data, about: e.target.value })} rows={9} placeholder="About" className="textarea textarea-bordered placeholder:text-base text-base resize-none" />
                        </div>
                    </div>
                    <div>
                        <label className="label">Avatar</label>
                        <div className="p-3 bg-base-100 card border border-base-300">
                            <div className="h-60 w-full card border border-base-300 flex justify-center items-center bg-base-100 mb-2">
                                {data.avatar ? (
                                    <Image image={data.avatar} className="h-60 w-full object-cover object-center" />
                                ) : (
                                    <UserCircleIcon className="h-20 w-20" />
                                )}
                            </div>
                            <ImageUploader title="Upload Avatar" setImage={setAvatar} />
                        </div>
                    </div>
                </div>
            </div>

            {error.length > 1 && (
                <div className="w-[70rem]">
                    <ErrorAlert error={error} setError={setError} />
                </div>
            )}

            <div className="w-[70rem] bg-base-200 card p-5">
                <div className="flex justify-between">
                    <button className="btn btn-outline" onClick={() => navigate(-1)}>
                        <ArrowLeftIcon className='h-5 w-5' />
                        Go Back
                    </button>
                    <button className="btn btn-info w-48" onClick={handleSubmit} disabled={loading}>
                        {loading ? (
                            <>
                                <span className="loading loading-spinner"></span>
                                Registering
                            </>
                        ) : (
                            "Register Writer"
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateWriter