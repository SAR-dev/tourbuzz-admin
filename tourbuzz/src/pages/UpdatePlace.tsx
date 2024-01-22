import { ArrowLeftIcon, PhotoIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { DivisionWithDistrictData, ImageType, PlaceType, TypeOfPlaceData, parseErrorMessage } from "@src/types";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "react-query";
import { deletePlaceById, getDivisions, getPlaceById, getTypesOfPlaces, updatePlace } from "@src/functions/api";
import ImageUploader from "@src/components/ImageUploader";
import PageHeader from "@src/components/PageHeader";
import { useNavigate, useParams } from "react-router-dom";
import ErrorAlert from "@src/components/ErrorAlert";
import Image from "@src/components/Image";
import DeleteButton from "@src/components/DeleteButton";
import ComboBoxInput, { ComboboxDataType } from "@src/components/ComboBoxInput";
import { checkMapLink } from "@src/functions/helpers";
import { PLACE } from "@src/constants/headers";

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

    const [selectedValue, setSelectedValue] = useState<ComboboxDataType | null>(null)
    const handleNewValue = (text: string) => setSelectedValue({value: text, text: text})

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
            setSelectedValue({
                value: place.type,
                text: place.type
            })
        })
    }, [placeId])

    const handleSubmit = async () => {
        if (!data.avatar) {
            setError("Upload avatar.")
            return;
        };
        if (!selectedValue) {
            setError("Select type.")
            return;
        };
        if(!checkMapLink(data.map_link)){
            setError("Use google map link of this format: maps.app.goo.gl/XXXX")
            return;
        }
        setError("")
        setLoading(true)
        updatePlace({
            places_id: Number(placeId),
            images_id: data.avatar.id,
            districts_id: data.districts_id,
            name: data.name,
            map_link: data.map_link,
            postal_code: data.postal_code,
            description: data.description,
            type: selectedValue.value
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
                title={PLACE.title}
                subtitle={PLACE.subtitle}
            />

            <div className="w-[70rem] bg-base-200 card p-5">
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="label">Name</label>
                        <input value={data.name} onChange={e => setData({ ...data, name: e.target.value })} type="text" placeholder="Name" className="input input-bordered w-full" />
                    </div>
                    <div>
                        <label className="label">Map Link</label>
                        <input value={data.map_link} onChange={e => setData({ ...data, map_link: e.target.value })} type="text" placeholder="Map Link" className="input input-bordered w-full" />
                    </div>
                    <div>
                        <label className="label">Postal Code</label>
                        <input value={data.postal_code} onChange={e => setData({ ...data, postal_code: e.target.value })} type="text" placeholder="Postal Code" className="input input-bordered w-full" />
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

                    <div className="grid grid-cols-1 gap-2">
                        <div>
                            <label className="label">Type</label>
                            {typeOfPlaceData && (
                                <ComboBoxInput
                                    values={typeOfPlaceData.data.map(e => { return { value: e.type, text: e.type, extraText: `(${e.count})` } })}
                                    selectedValue={selectedValue}
                                    setSelectedValue={setSelectedValue}
                                    handleNewValue={handleNewValue}
                                />
                            )}
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="label">Description</label>
                            <textarea value={data.description} onChange={e => setData({ ...data, description: e.target.value })} rows={12} placeholder="Description" className="textarea textarea-bordered placeholder:text-base text-base resize-none" />
                        </div>
                    </div>
                    <div>
                        <label className="label">Thumbnail</label>
                        <div className="p-3 bg-base-100 card border border-base-300">
                            <div className="h-80 w-full card border border-base-300 flex justify-center items-center bg-base-100 mb-2">
                                {data.avatar ? (
                                    <Image image={data.avatar} className="h-80 w-full object-contain object-center" />
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