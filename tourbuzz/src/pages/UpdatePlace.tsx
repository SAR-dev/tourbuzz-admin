import { ArrowLeftIcon, PhotoIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { DivisionWithDistrictData, ImageType, PlaceType, TypeOfPlaceData, parseErrorMessage } from "@src/constants/types";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "react-query";
import { deletePlaceById, getDivisions, getPlaceById, getTypesOfPlaces, updatePlace } from "@src/functions/api";
import ImageUploader from "@src/components/ImageUploader";
import PageHeader from "@src/components/PageHeader";
import { useNavigate, useParams } from "react-router-dom";
import ErrorAlert from "@src/components/ErrorAlert";
import Image from "@src/components/Image";
import DeleteButton from "@src/components/DeleteButton";

interface UpdatePlaceState {
    districts_id: number
    name: string
    postal_code: string
    map_link: string
    description: string
    type: string
    avatar: ImageType | null
}

const UpdatePlace = () => {
    let { placeId } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const queryClient = useQueryClient()
    const [data, setData] = useState<UpdatePlaceState>({
        districts_id: 0,
        name: "",
        postal_code: "",
        map_link: "",
        description: "",
        type: "",
        avatar: null
    })
    const [error, setError] = useState("")

    const { data: districtsData } = useQuery<DivisionWithDistrictData, Error>({
        queryKey: ['districts'],
        queryFn: () => getDivisions()
    })

    const { data: typeOfPlaceData } = useQuery<TypeOfPlaceData, Error>({
        queryKey: ['place-types'],
        queryFn: () => getTypesOfPlaces()
    })

    useEffect(() => {
        getPlaceById({ id: Number(placeId) }).then(res => {
            const place: PlaceType = res.data;
            setData({ ...place })
        })
    }, [placeId])

    const handleSubmit = async () => {
        if (!data.avatar) {
            setError("Upload avatar.")
            return;
        };
        setError("")
        setLoading(true)
        updatePlace({
            places_id: Number(placeId),
            images_id: data.avatar.id,
            districts_id: data.districts_id,
            name: data.name,
            map_link: data.map_link,
            postal_code: data.postal_code,
            description: data.description
        }).then(res => {
            if (res.error) {
                toast.error("Update failed 🤦‍♂️")
                setError(parseErrorMessage(res.error).message)
                setLoading(false)
            } else {
                toast.success("Place Updated 💪")
                queryClient.invalidateQueries("places")
                setLoading(false)
                navigate("/places")
            }

        })
    }

    const setAvatar = (image: ImageType) => {
        setData({ ...data, avatar: image })
    }

    const handleDelete = () => {
        setDeleting(true)
        deletePlaceById({ id: Number(placeId) }).then(res => {
            if (res.error) {
                toast.error("Delete failed 🤦‍♂️")
                setError(parseErrorMessage(res.error).message)
                setDeleting(false)
            } else {
                toast.success("Place Deleted 💪")
                queryClient.invalidateQueries("places")
                setDeleting(false)
                navigate("/places")
            }

        })
    }

    return (
        <div className="grid grid-cols-1 gap-5">
            <PageHeader
                title="Venue Gallery"
                subtitle="Let's upload some images and store them for later! 🎉"
            />

            <div className="w-[70rem] bg-base-200 card p-5">
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="text-sm font-semibold">Name</label>
                        <input value={data.name} onChange={e => setData({ ...data, name: e.target.value })} type="text" placeholder="Name" className="input input-bordered w-full" />
                    </div>
                    <div>
                        <label className="text-sm font-semibold">Map Link</label>
                        <input value={data.map_link} onChange={e => setData({ ...data, map_link: e.target.value })} type="text" placeholder="Map Link" className="input input-bordered w-full" />
                    </div>
                    <div>
                        <label className="text-sm font-semibold">Postal Code</label>
                        <input value={data.postal_code} onChange={e => setData({ ...data, postal_code: e.target.value })} type="text" placeholder="Postal Code" className="input input-bordered w-full" />
                    </div>
                    <div>
                        <label className="text-sm font-semibold">District</label>
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

                    <div className="grid grid-cols-1 gap-2">
                        <div>
                            <label className="text-sm font-semibold">Type</label>
                            <select value={data.type} onChange={e => setData({ ...data, type: e.target.value })} className="select custom-scrollbar w-full select-bordered">
                                <option disabled selected value="">Select Type</option>
                                {typeOfPlaceData && typeOfPlaceData.data.map((e, i) => (
                                    <option value={e.type} key={i}>{e.type} ({e.count})</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="text-sm font-semibold">Description</label>
                            <textarea value={data.description} onChange={e => setData({ ...data, description: e.target.value })} rows={12} placeholder="Description" className="textarea textarea-bordered placeholder:text-base text-base resize-none" />
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-semibold">Thumbnail</label>
                        <div className="p-3 bg-base-100 card border border-base-300">
                            <div className="h-80 w-full card border border-base-300 flex justify-center items-center bg-base-100 mb-2">
                                {data.avatar ? (
                                    <Image image={data.avatar} disableThumbnail className="h-80 w-full object-cover object-center" />
                                ) : (
                                    <PhotoIcon className="h-20 w-20" />
                                )}
                            </div>
                            <ImageUploader title="Upload Thumbnail" setImage={setAvatar} />
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
                                "Update Venue"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdatePlace