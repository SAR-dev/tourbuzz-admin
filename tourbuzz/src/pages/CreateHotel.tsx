import { useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/16/solid'
import { getDivisions, postHotel } from '@src/functions/api'
import { useQuery, useQueryClient } from 'react-query'
import { DivisionWithDistrictData, DivisionWithDistrictType, parseErrorMessage } from '@src/constants/types';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import PageHeader from '@src/components/PageHeader';
import ErrorAlert from '@src/components/ErrorAlert';

interface CreateHotelState {
    districts_id: number
    name: string
    map_link: string
    review: string
    website: string
}

const CreateHotel = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const queryClient = useQueryClient()
    const [data, setData] = useState<CreateHotelState>({
        districts_id: 0,
        name: "",
        map_link: "",
        review: "",
        website: ""
    })

    const { data: districtsData } = useQuery<DivisionWithDistrictData, Error>({
        queryKey: ['districts'],
        queryFn: () => getDivisions()
    })

    const handleSubmit = async () => {
        setError("")
        setLoading(true)
        postHotel({ ...data }).then(res => {
            if (res.error) {
                toast.error("Registration failed 🤦‍♂️")
                setError(parseErrorMessage(res.error).message)
                setLoading(false)
            } else {
                toast.success("Hotel Registered 💪")
                queryClient.invalidateQueries("hotels")
                setLoading(false)
                navigate("/hotels")
            }
        })
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
                        <label className="text-sm font-semibold">Name</label>
                        <input value={data.name} onChange={e => setData({ ...data, name: e.target.value })} type="text" placeholder="Name" className="input input-bordered w-full" />
                    </div>
                    <div>
                        <label className="text-sm font-semibold">Website</label>
                        <input value={data.website} onChange={e => setData({ ...data, website: e.target.value })} type="text" placeholder="Website" className="input input-bordered w-full" />
                    </div>
                    <div>
                        <label className="text-sm font-semibold">Map Link</label>
                        <input value={data.map_link} onChange={e => setData({ ...data, map_link: e.target.value })} type="text" placeholder="Map Link" className="input input-bordered w-full" />
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
                    <div className="col-span-2">
                        <div className="flex flex-col w-full">
                            <label className="text-sm font-semibold">Review</label>
                            <textarea value={data.review} onChange={e => setData({ ...data, review: e.target.value })} rows={8} placeholder="Review" className="textarea textarea-bordered placeholder:text-base text-base resize-none" />
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
                            "Register Hotel"
                        )}
                    </button>
                </div>
            </div>

        </div>
    )
}

export default CreateHotel