import { useEffect, useState } from 'react';
import { ArrowLeftIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { deleteHotelById, getDivisions, getHotelById, updateHotel } from '@src/functions/api';
import { useQuery, useQueryClient } from 'react-query'
import { DivisionWithDistrictType, HotelType, ImageType, parseErrorMessage } from '@src/types';
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '@src/components/PageHeader';
import ErrorAlert from '@src/components/ErrorAlert';
import DeleteButton from '@src/components/DeleteButton';
import Image from '@src/components/Image';
import ImageUploader from '@src/components/ImageUploader';

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

    const { data: districtsData } = useQuery<DivisionWithDistrictData, Error>({
        queryKey: ['districts'],
        queryFn: () => getDivisions()
    })

    useEffect(() => {
        getHotelById({ id: Number(hotelId) }).then(res => {
            const hotel: HotelType = res.data;
            setData({ ...hotel })
        })
    }, [hotelId])


    const handleSubmit = async () => {
        if (!data.avatar) {
            setError("Upload avatar.")
            return;
        };
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

    return (
        <div className="grid grid-cols-1 gap-5">
            <PageHeader
                title="Writers Profiles"
                subtitle="Let's upload some images and store them for later! 🎉"
            />

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