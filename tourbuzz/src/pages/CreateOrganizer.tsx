import { ArrowLeftIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { ImageType, parseErrorMessage } from "@src/types";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";
import { postOrganizer } from "@src/functions/api";
import ImageUploader from "@src/components/ImageUploader";
import PageHeader from "@src/components/PageHeader";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "@src/components/ErrorAlert";
import Image from "@src/components/Image";

interface CreateOrganizerState {
    email: string
    name: string
    username: string
    description: string
    slogan: string
    contact_no: string
    verification: string
    social_link: string
    avatar: ImageType | null
}

const CreateOrganizer = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const queryClient = useQueryClient()
    const [data, setData] = useState<CreateOrganizerState>({
        email: "",
        contact_no: "",
        name: "",
        username: "",
        description: "",
        slogan: "",
        verification: "LEVEL1",
        avatar: null,
        social_link: ""
    })
    const [error, setError] = useState("")

    const handleSubmit = async () => {
        if (!data.avatar) {
            setError("Upload avatar.")
            return;
        };
        setError("")
        setLoading(true)
        postOrganizer({
            images_id: data.avatar.id,
            email: data.email,
            contact_no: data.contact_no,
            name: data.name,
            username: data.username,
            description: data.description,
            slogan: data.slogan,
            verification: data.verification,
            social_link: data.social_link
        }).then(res => {
            if (res.error) {
                toast.error("Registration failed 🤦‍♂️")
                setError(parseErrorMessage(res.error).message)
                setLoading(false)
            } else {
                toast.success("Organizer Registered 💪")
                queryClient.invalidateQueries("organizers")
                setLoading(false)
                navigate("/organizers")
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
                        <label className="label">Phone No</label>
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
                    <div>
                        <label className="label">Slogan</label>
                        <input value={data.slogan} onChange={e => setData({ ...data, slogan: e.target.value })} type="text" placeholder="Slogan" className="input input-bordered w-full" />
                    </div>
                    <div>
                        <label className="label">Verification Level</label>
                        <select value={data.verification} onChange={e => setData({ ...data, verification: e.target.value })} className="select custom-scrollbar w-full select-bordered">
                            <option disabled selected>Verification Level</option>
                            <option value="LEVEL1">Level 01</option>
                            <option value="LEVEL2">Level 02</option>
                            <option value="LEVEL3">Level 03</option>
                            <option value="LEVEL4">Level 04</option>
                            <option value="LEVEL5">Level 05</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                        <div>
                            <label className="label">Social Link</label>
                            <input value={data.social_link} onChange={e => setData({ ...data, social_link: e.target.value })} type="text" placeholder="Social Link" className="input input-bordered w-full" />
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="label">About</label>
                            <textarea value={data.description} onChange={e => setData({ ...data, description: e.target.value })} rows={9} placeholder="Description" className="textarea textarea-bordered custom-scrollbar placeholder:text-base text-base resize-none" />
                        </div>
                    </div>
                    <div>
                        <label className="label">Avatar</label>
                        <div className="p-3 bg-base-100 card border border-base-300">
                            <div className="h-60 w-full card border border-base-300 flex justify-center items-center bg-base-100 mb-2">
                                {data.avatar ? (
                                    <Image image={data.avatar} className="h-60 w-full object-contain object-center" />
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
                            "Register Organizer"
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateOrganizer