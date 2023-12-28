import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { ImageType, parseErrorMessage } from "@src/constants/types";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";
import { postWriter } from "@src/functions/api";
import ImageUploader from "@src/components/ImageUploader";
import PageHeader from "@src/components/PageHeader";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "@src/components/ErrorAlert";
import DeleteButton from "@src/components/DeleteButton";

interface RegisterWriterState {
    email: string
    name: string
    username: string
    about: string
    avatar: ImageType | null
    phone_no: string
    website: string
}

const initialState: RegisterWriterState = {
    email: "",
    name: "",
    username: "",
    about: "",
    avatar: null,
    phone_no: "",
    website: ""
}

const RegisterWriter = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const queryClient = useQueryClient()
    const [data, setData] = useState<RegisterWriterState>({ ...initialState })
    const [error, setError] = useState("")

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
            about: data.about,
            phone_no: data.phone_no,
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
                setData({ ...initialState })
                navigate("/writers")
            }

        })
    }

    const setAvatar = (image: ImageType) => {
        setData({ ...data, avatar: image })
    }

    return (
        <div>
            <PageHeader
                title="Writers Profiles"
                subtitle="Let's upload some images and store them for later! 🎉"
            />

            <div className="w-[70rem] my-5">
                <div className="grid grid-cols-2 gap-5">
                    <input value={data.email} onChange={e => setData({ ...data, email: e.target.value })} type="text" placeholder="Email" className="input input-bordered w-full" />
                    <input value={data.phone_no} onChange={e => setData({ ...data, phone_no: e.target.value })} type="text" placeholder="Phone No" className="input input-bordered w-full" />
                    <input value={data.name} onChange={e => setData({ ...data, name: e.target.value })} type="text" placeholder="Name" className="input input-bordered w-full" />
                    <input value={data.username} onChange={e => setData({ ...data, username: e.target.value })} type="text" placeholder="Username" className="input input-bordered w-full" />
                    <div className="grid grid-cols-1 gap-5">
                        <input value={data.website} onChange={e => setData({ ...data, website: e.target.value })} type="text" placeholder="Website" className="input input-bordered w-full" />
                        <textarea value={data.about} onChange={e => setData({ ...data, about: e.target.value })} rows={10} placeholder="About" className="textarea textarea-bordered placeholder:text-base text-base" />
                    </div>
                    <div>
                        <div className="min-h-64 w-full card border border-base-300 flex justify-center items-center mb-5">
                            {data.avatar ? (
                                <img className="h-64 w-full object-contain object-center" src={data.avatar.source_url} alt="" />
                            ) : (
                                <UserCircleIcon className="h-20 w-20" />
                            )}
                        </div>
                        <ImageUploader title="Upload Avatar" setImage={setAvatar} />
                    </div>
                </div>
                {error.length > 1 && (
                    <div className="flex space-x-5 justify-end mt-5 pt-5 border-t border-base-300">
                        <ErrorAlert error={error} setError={setError} />
                    </div>
                )}
                <div className="flex space-x-5 justify-end mt-5 pt-5 border-t border-base-300">
                    <button className="btn" onClick={() => navigate(-1)}>Go Back</button>
                    <button className="btn btn-info" onClick={uploadWriter} disabled={loading}>
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

export default RegisterWriter