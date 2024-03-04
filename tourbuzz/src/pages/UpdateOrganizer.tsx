import { ArrowLeftIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { ImageType, OrganizerType, UserType, parseErrorMessage } from "@src/types";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";
import { deleteOrganizerById, deleteOrganizerManager, getOrganizerById, postOrganizerManager, updateOrganizer } from "@src/functions/api";
import ImageUploader from "@src/components/ImageUploader";
import PageHeader from "@src/components/PageHeader";
import { useNavigate, useParams } from "react-router-dom";
import ErrorAlert from "@src/components/ErrorAlert";
import DeleteButton from "@src/components/DeleteButton";
import Image from "@src/components/Image";
import { ORGANIZER } from "@src/constants/headers";
import classNames from "classnames";
import { TrashIcon } from "@heroicons/react/24/outline";

interface UpdateOrganizerState {
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

const UpdateOrganizer = () => {
    let { organizerId } = useParams()
    const navigate = useNavigate()
    const [deleting, setDeleting] = useState(false)
    const [loading, setLoading] = useState(false)
    const queryClient = useQueryClient()
    const [data, setData] = useState<UpdateOrganizerState>({
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

    const [email, setEmail] = useState("")
    const [position, setPosition] = useState("ADMIN")
    const [admins, setAdmins] = useState<UserType[]>([])
    const [staffs, setStaffs] = useState<UserType[]>([])

    useEffect(() => {
        getOrganizerById({ id: Number(organizerId) }).then(res => {
            const organizer: OrganizerType = res.data;
            setData({ ...organizer })
            setAdmins(organizer.admins)
            setStaffs(organizer.staffs)
        })
    }, [organizerId])

    const handleSubmit = async () => {
        if (!data.avatar) {
            setError("Upload avatar.")
            return;
        };
        setError("")
        setLoading(true)
        updateOrganizer({
            organizers_id: Number(organizerId),
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
                toast.error("Update failed 🤦‍♂️")
                setError(parseErrorMessage(res.error).message)
                setLoading(false)
            } else {
                toast.success("Organizer Updated 💪")
                queryClient.invalidateQueries("organizers")
                setLoading(false)
                navigate("/organizers")
            }

        })
    }

    const setAvatar = (image: ImageType) => {
        setData({ ...data, avatar: image })
    }

    const handleDelete = () => {
        setDeleting(true)
        deleteOrganizerById({ id: Number(organizerId) }).then(res => {
            if (res.error) {
                toast.error("Delete failed 🤦‍♂️")
                setError(parseErrorMessage(res.error).message)
                setDeleting(false)
            } else {
                toast.success("Organizer Deleted 💪")
                queryClient.invalidateQueries("organizers")
                setDeleting(false)
                navigate("/organizers")
            }

        })
    }

    const handleAddManager = () => {
        if (email.length < 1) return;
        setLoading(true)
        postOrganizerManager({ email, position, organizers_id: Number(organizerId) }).then(res => {
            if (res.error) {
                toast.error("Submit failed 🤦‍♂️")
                setError(parseErrorMessage(res.error).message)
                setLoading(false)
            } else {
                setEmail("")
                toast.success("Manager Created 💪")
                queryClient.invalidateQueries("organizers")
                setLoading(false)
                getOrganizerById({ id: Number(organizerId) }).then(res => {
                    const organizer: OrganizerType = res.data;
                    setAdmins(organizer.admins)
                    setStaffs(organizer.staffs)
                })
            }

        })
    }

    const handleDeleteManager = (manager_email: string) => {
        if (manager_email.length < 1) return;
        deleteOrganizerManager({ email: manager_email, organizers_id: Number(organizerId) }).then(res => {
            if (res.error) {
                toast.error("Submit failed 🤦‍♂️")
                setError(parseErrorMessage(res.error).message)
                setLoading(false)
            } else {
                setEmail("")
                toast.success("Manager Deleted 💪")
                queryClient.invalidateQueries("organizers")
                setLoading(false)
                getOrganizerById({ id: Number(organizerId) }).then(res => {
                    const organizer: OrganizerType = res.data;
                    setAdmins(organizer.admins)
                    setStaffs(organizer.staffs)
                })
            }
        })
    }

    return (
        <div className="grid grid-cols-1 gap-5">
            <PageHeader
                title={ORGANIZER.title}
                subtitle={ORGANIZER.subtitle}
            />
            <div className="flex gap-5">
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
                <div className="bg-base-200 card p-5 min-w-64">
                    <div className="grid grid-cols-1 gap-8">
                        <div>
                            <div className="font-semibold mb-3 border-b">Admins</div>
                            <div className="flex flex-col gap-1">
                                {admins.map((e, i) => (
                                    <div key={i} className="flex gap-2 text-sm">
                                        <div>{i + 1}</div>
                                        <div>{e.email}</div>
                                        <button className="ml-auto btn btn-xs btn-error" onClick={() => handleDeleteManager(e.email)}>
                                            <TrashIcon className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="font-semibold mb-3 border-b">Staffs</div>
                            <div className="flex flex-col gap-1">
                                {staffs.map((e, i) => (
                                    <div key={i} className="flex gap-2 text-sm">
                                        <div>{i + 1}</div>
                                        <div>{e.email}</div>
                                        <button className="ml-auto btn btn-xs btn-error" onClick={() => handleDeleteManager(e.email)}>
                                            <TrashIcon className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <input type="text" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} className="input input-sm input-bordered w-full max-w-xs" />
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    className={classNames({
                                        "btn btn-sm": true,
                                        "btn-primary": position === "ADMIN",
                                        "btn-outline": position !== "ADMIN"
                                    })}
                                    onClick={() => setPosition("ADMIN")}
                                >Admin</button>
                                <button
                                    className={classNames({
                                        "btn btn-sm": true,
                                        "btn-primary": position === "STAFF",
                                        "btn-outline": position !== "STAFF"
                                    })}
                                    onClick={() => setPosition("STAFF")}
                                >Staff</button>
                            </div>
                            <button className="btn btn-sm btn-info" onClick={handleAddManager}>
                                {loading && <span className="loading loading-spinner"></span>}
                                Add/Change Manager
                            </button>
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
                    <div className="flex space-x-5">
                        <DeleteButton handleDelete={handleDelete} loading={deleting} />
                        <button className="btn btn-info w-48" onClick={handleSubmit} disabled={loading}>
                            {loading ? (
                                <>
                                    <span className="loading loading-spinner"></span>
                                    Updating
                                </>
                            ) : (
                                "Update Organizer"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateOrganizer