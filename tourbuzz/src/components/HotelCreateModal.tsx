import { useState } from 'react';
import Modal from './Modal'
import { ArrowLeftIcon } from '@heroicons/react/16/solid'
import { getDivisions, postHotel } from '@src/functions/api'
import { useQuery, useQueryClient } from 'react-query'
import { DivisionWithDistrictType, parseErrorMessage } from '@src/types';
import ErrorAlert from './ErrorAlert'
import { toast } from 'react-toastify'

interface CreateHotelState {
    districts_id: number
    name: string
    map_link: string
    review: string
    website: string
}

const initialCreateHotelData: CreateHotelState = {
    districts_id: 0,
    name: "",
    map_link: "",
    review: "",
    website: ""
}

interface DivisionWithDistrictData {
    data: DivisionWithDistrictType[]
}

const HotelCreateModal = ({
    open,
    handleOpen,
}: {
    open: boolean,
    handleOpen: () => void
}) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const queryClient = useQueryClient()
    
    const { data } = useQuery<DivisionWithDistrictData, Error>({
        queryKey: ['districts'],
        queryFn: () => getDivisions()
    })

    const [createHotelData, setCreateHotelData] = useState<CreateHotelState>({
        ...initialCreateHotelData
    })

    const handleSubmit = async () => {
        setError("")
        setLoading(true)
        postHotel({...createHotelData}).then(res => {
            if (res.error) {
                toast.error("Registration failed 🤦‍♂️")
                setError(parseErrorMessage(res.error).message)
                setLoading(false)
            } else {
                toast.success("Hotel Registered 💪")
                queryClient.invalidateQueries("hotels")
                setLoading(false)
                setCreateHotelData({...initialCreateHotelData})
                handleOpen()
            }
        })
    }

    return (
        <Modal width="50rem" title="Create Hotel" open={open} handleClose={handleOpen} footer={
            <div className="w-full flex justify-between">
                <button className="btn btn-outline" onClick={handleOpen}>
                    <ArrowLeftIcon className='h-5 w-5' />
                    Go Back
                </button>
                <div className="flex space-x-3">
                    <button className="btn" onClick={handleSubmit} disabled={loading}>
                        {loading ? (
                            <>
                                <span className="loading loading-spinner"></span>
                                Registering
                            </>
                        ) : (
                            "Register"
                        )}
                    </button>
                </div>
            </div>
        }>
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="label">Name</label>
                    <input value={createHotelData.name} onChange={e => setCreateHotelData({ ...createHotelData, name: e.target.value })} type="text" placeholder="Name" className="input input-bordered w-full" />
                </div>
                <div>
                    <label className="label">Website</label>
                    <input value={createHotelData.website} onChange={e => setCreateHotelData({ ...createHotelData, website: e.target.value })} type="text" placeholder="Website" className="input input-bordered w-full" />
                </div>
                <div>
                    <label className="label">Map Link</label>
                    <input value={createHotelData.map_link} onChange={e => setCreateHotelData({ ...createHotelData, map_link: e.target.value })} type="text" placeholder="Map Link" className="input input-bordered w-full" />
                </div>
                <div>
                    <label className="label">District</label>
                    <select value={createHotelData.districts_id} onChange={e => setCreateHotelData({ ...createHotelData, districts_id: Number(e.target.value) })} className="select custom-scrollbar w-full select-bordered">
                        <option disabled selected value={0}>Select District</option>
                        {data && data.data.map((e, i) => (
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
                        <label className="label">Review</label>
                        <textarea value={createHotelData.review} onChange={e => setCreateHotelData({ ...createHotelData, review: e.target.value })} rows={8} placeholder="Review" className="textarea textarea-bordered placeholder:text-base text-base resize-none" />
                    </div>
                </div>
                <div className="col-span-2">
                    {error.length > 1 && (
                        <ErrorAlert error={error} setError={setError} />
                    )}
                </div>
            </div>
        </Modal>
    )
}

export default HotelCreateModal