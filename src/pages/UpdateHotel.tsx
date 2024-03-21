import { useEffect, useState } from 'react';
import { ArrowLeftIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { deleteHotelById, deleteHotelManager, getDivisions, getHotelById, postHotelManager, updateHotel } from '@src/functions/api';
import { useQuery, useQueryClient } from 'react-query'
import { DivisionWithDistrictType, HotelType, ImageType, UserType, parseErrorMessage } from '@src/types';
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '@src/components/PageHeader';
import ErrorAlert from '@src/components/ErrorAlert';
import DeleteButton from '@src/components/DeleteButton';
import Image from '@src/components/Image';
import ImageUploader from '@src/components/ImageUploader';
import { checkMapLink } from '@src/functions/helpers';
import { HOTEL } from '@src/constants/headers';
import { TrashIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';

interface UpdateHotelState {
    districts_id: number
    name: string
    map_link: string
    review: string
    website: string
    avatar: ImageType | null
}

interface DivisionWithDistrictData {
    data: DivisionWithDistrictType[]
}

const UpdateHotel = () => {
    let { hotelId } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [error, setError] = useState("")
    const queryClient = useQueryClient()
    const [data, setData] = useState<UpdateHotelState>({
        districts_id: 0,
        name: "",
        map_link: "",
        review: "",
        website: "",
        avatar: null
    })

    const [email, setEmail] = useState("")
    const [position, setPosition] = useState("ADMIN")
    const [admins, setAdmins] = useState<UserType[]>([])
    const [staffs, setStaffs] = useState<UserType[]>([])

    const { data: districtsData } = useQuery<DivisionWithDistrictData, Error>({
        queryKey: ['districts'],
        queryFn: () => getDivisions()
    })

    useEffect(() => {
        getHotelById({ id: Number(hotelId) }).then(res => {
            const hotel: HotelType = res.data;
            setData({ ...hotel })
            setAdmins(hotel.admins)
            setStaffs(hotel.staffs)
        })
    }, [hotelId])


    const handleSubmit = async () => {
        if (!data.avatar) {
            setError("Upload avatar.")
            return;
        };
        if (!checkMapLink(data.map_link)) {
            setError("Use google map link of this format: maps.app.goo.gl/XXXX")
            return;
        }
        setError("")
        setLoading(true)
        updateHotel({
            ...data,
            hotels_id: Number(hotelId),
            images_id: data.avatar.id
        }).then(res => {
            if (res.error) {
                toast.error("Update failed 🤦‍♂️")
                setError(parseErrorMessage(res.error).message)
                setLoading(false)
            } else {
                toast.success("Hotel Updated 💪")
                queryClient.invalidateQueries("hotels")
                setLoading(false)
                navigate("/hotels")
            }
        })
    }

    const handleDelete = () => {
        setDeleting(true)
        deleteHotelById({ id: Number(hotelId) }).then(res => {
            if (res.error) {
                toast.error("Delete failed 🤦‍♂️")
                setError(parseErrorMessage(res.error).message)
                setDeleting(false)
            } else {
                toast.success("Hotel Deleted 💪")
                queryClient.invalidateQueries("hotels")
                setDeleting(false)
                navigate("/hotels")
            }

        })
    }

    const setAvatar = (image: ImageType) => {
        setData({ ...data, avatar: image })
    }

    const handleAddManager = () => {
        if (email.length < 1) return;
        setLoading(true)
        postHotelManager({ email, position, hotels_id: Number(hotelId) }).then(res => {
            if (res.error) {
                toast.error("Submit failed 🤦‍♂️")
                setError(parseErrorMessage(res.error).message)
                setLoading(false)
            } else {
                setEmail("")
                toast.success("Manager Created 💪")
                queryClient.invalidateQueries("hotels")
                setLoading(false)
                getHotelById({ id: Number(hotelId) }).then(res => {
                    const hotel: HotelType = res.data;
                    setAdmins(hotel.admins)
                    setStaffs(hotel.staffs)
                })
            }

        })
    }

    const handleDeleteManager = (manager_email: string) => {
        if (manager_email.length < 1) return;
        deleteHotelManager({ email: manager_email, hotels_id: Number(hotelId) }).then(res => {
            if (res.error) {
                toast.error("Submit failed 🤦‍♂️")
                setError(parseErrorMessage(res.error).message)
                setLoading(false)
            } else {
                setEmail("")
                toast.success("Manager Deleted 💪")
                queryClient.invalidateQueries("hotels")
                setLoading(false)
                getHotelById({ id: Number(hotelId) }).then(res => {
                    const hotel: HotelType = res.data;
                    setAdmins(hotel.admins)
                    setStaffs(hotel.staffs)
                })
            }
        })
    }


    return (
        <div className="grid grid-cols-1 gap-5">
            <PageHeader
                title={HOTEL.title}
                subtitle={HOTEL.subtitle}
            />
            <div className="flex gap-5">
                <div className="w-[70rem] bg-base-200 card p-5">
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="label">Name</label>
                            <input value={data.name} onChange={e => setData({ ...data, name: e.target.value })} type="text" placeholder="Name" className="input input-bordered w-full" />
                        </div>
                        <div>
                            <label className="label">Website</label>
                            <input value={data.website} onChange={e => setData({ ...data, website: e.target.value })} type="text" placeholder="Website" className="input input-bordered w-full" />
                        </div>
                        <div>
                            <label className="label">Map Link</label>
                            <input value={data.map_link} onChange={e => setData({ ...data, map_link: e.target.value })} type="text" placeholder="Map Link" className="input input-bordered w-full" />
                        </div>
                        <div>
                            <label className="label">District</label>
                            <select value={data.districts_id} onChange={e => setData({ ...data, districts_id: Number(e.target.value) })} className="select custom-scrollbar w-full select-bordered">
                                <option disabled selected value={0}>Select District</option>
                                {districtsData && districtsData.data.map((e, i) => (
                                    <optgroup label={e.division.name} key={i}>
                                        {e.districts.map((c) => (
                                            <option value={c.id} key={c.id}>{c.name}</option>
                                        ))}
                                    </optgroup>
                                ))}
                            </select>
                        </div>
                        <div>
                            <div className="flex flex-col w-full">
                                <label className="label">Review</label>
                                <textarea value={data.review} onChange={e => setData({ ...data, review: e.target.value })} rows={13} placeholder="Review" className="textarea textarea-bordered custom-scrollbar placeholder:text-base text-base resize-none" />
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
                                "Update Hotel"
                            )}
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default UpdateHotel