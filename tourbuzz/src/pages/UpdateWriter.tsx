import { ArrowLeftIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { ImageType, WriterType, parseErrorMessage } from "@src/constants/types";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";
import { deleteWriterById, getWriterById, putWriter } from "@src/functions/api";
import ImageUploader from "@src/components/ImageUploader";
import PageHeader from "@src/components/PageHeader";
import { useNavigate, useParams } from "react-router-dom";
import ErrorAlert from "@src/components/ErrorAlert";
import DeleteButton from "@src/components/DeleteButton";

interface UpdateWriterState {
    email: string
    name: string
    username: string
    about: string
    avatar: ImageType | null
    phone_no: string
    website: string
}

const UpdateWriter = () => {
    let { writerId } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const queryClient = useQueryClient()
    const [data, setData] = useState<UpdateWriterState>({
        email: "",
        name: "",
        username: "",
        about: "",
        avatar: null,
        phone_no: "",
        website: ""
    })
    const [error, setError] = useState("")

    useEffect(() => {
        getWriterById({ id: Number(writerId) }).then(res => {
            const writer: WriterType = res.data;
            setData({ ...writer })
        })
    }, [writerId])

    const updateWriter = async () => {
        if (!data.avatar) {
            setError("Upload avatar.")
            return;
        };
        setError("")
        setLoading(true)
        putWriter({
            writers_id: Number(writerId),
            images_id: data.avatar.id,
            email: data.email,
            name: data.name,
            username: data.username,
            about: data.about,
            phone_no: data.phone_no,
            website: data.website
        }).then(res => {
            if (res.error) {
                toast.error("Update failed 🤦‍♂️")
                setError(parseErrorMessage(res.error).message)
                setLoading(false)
            } else {
                toast.success("Writer updates 💪")
                queryClient.invalidateQueries("writers")
                setLoading(false)
                navigate("/writers")
            }

        })
    }

    const deleteWriter = () => {
        setDeleting(true)
        deleteWriterById({ id: Number(writerId) }).then(res => {
            if (res.error) {
                toast.error("Delete failed 🤦‍♂️")
                setError(parseErrorMessage(res.error).message)
                setDeleting(false)
            } else {
                toast.success("Writer Deleted 💪")
                queryClient.invalidateQueries("writers")
                setDeleting(false)
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
                <div className="grid grid-cols-2 gap-5">
                    <input value={data.email} onChange={e => setData({ ...data, email: e.target.value })} type="text" placeholder="Email" className="input input-bordered w-full" />
                    <input value={data.phone_no} onChange={e => setData({ ...data, phone_no: e.target.value })} type="text" placeholder="Phone No" className="input input-bordered w-full" />
                    <input value={data.name} onChange={e => setData({ ...data, name: e.target.value })} type="text" placeholder="Name" className="input input-bordered w-full" />
                    <input value={data.username} onChange={e => setData({ ...data, username: e.target.value })} type="text" placeholder="Username" className="input input-bordered w-full" />
                    <div className="grid grid-cols-1 gap-5">
                        <input value={data.website} onChange={e => setData({ ...data, website: e.target.value })} type="text" placeholder="Website" className="input input-bordered w-full" />
                        <textarea value={data.about} onChange={e => setData({ ...data, about: e.target.value })} rows={10} placeholder="About" className="textarea textarea-bordered placeholder:text-base text-base resize-none" />
                    </div>
                    <div>
                        <div className="min-h-64 w-full card border border-base-300 flex justify-center items-center bg-base-100 mb-5">
                            {data.avatar ? (
                                <img className="h-64 w-full object-contain object-center" src={data.avatar.source_url} alt="" />
                            ) : (
                                <UserCircleIcon className="h-20 w-20" />
                            )}
                        </div>
                        <ImageUploader title="Upload Avatar" setImage={setAvatar} />
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
                    <div className="flex space-x-5">
                        <DeleteButton handleDelete={deleteWriter} loading={deleting} />
                        <button className="btn btn-info w-48" onClick={updateWriter} disabled={loading}>
                            {loading ? (
                                <>
                                    <span className="loading loading-spinner"></span>
                                    Updating
                                </>
                            ) : (
                                "Update Writer"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateWriter