import { useState } from 'react'
import { useQuery } from 'react-query'
import Modal from './Modal'
import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/solid';
import { useDebounce } from 'use-debounce';
import SearchResultCard from './SearchResultCard'
import { PlaceType } from '@src/types';
import { getPlaces } from '@src/functions/api';

interface MultiplePlaceSelectData {
    data: {
        data: PlaceType[]
        page_no: number
        page_size: number
        has_prev: boolean
        has_next: boolean
        total_result: number
        total_pages: number
    }
}

const MultiplePlaceSelect = ({
    place,
    setPlace
}: {
    place: PlaceType | null,
    setPlace: (props: PlaceType) => void
}) => {
    const [name, setName] = useState("")
    const [dName] = useDebounce(name, 500);

    const [open, setOpen] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState<PlaceType | null>(null)

    const { isLoading, error, data } = useQuery<MultiplePlaceSelectData, Error>({
        queryKey: ['places', dName],
        queryFn: () => getPlaces({ pageNo: 1, pageSize: 50, name: dName })
    })

    const handleSelectedPlace = (id: number) => {
        const found = data?.data.data.find(e => e.id == id)
        if (!found || place?.id == id) return;
        setSelectedPlace(found)
    }

    const handleOpen = (_?: any) => {
        setOpen(true)
        setSelectedPlace(place)
    }

    const handleClose = () => {
        setOpen(false)
        setSelectedPlace(null)
    };

    const handleSubmit = () => {
        if (!selectedPlace) return;
        setPlace(selectedPlace)
        handleClose()
    }

    return (
        <div>
            {place ? (
                <SearchResultCard 
                    id={place.id}
                    avatar={place.avatar}
                    title={place.name}
                    subtitle={`${place.district.name}, ${place.district.division.name}`}
                    handleClick={handleOpen} 
                    shownInResult={true}
                />
            ) : (
                <button className="btn btn-lg w-full btn-outline text-base" onClick={handleOpen}>
                    Click to Select
                </button>
            )}
            <Modal open={open} handleClose={handleClose} title='Select Place' width='50rem' footer={
                <div className='flex justify-between w-full'>
                    <button className="btn btn-outline" onClick={handleClose}>
                        <ArrowLeftIcon className='h-5 w-5' />
                        Go Back
                    </button>
                    <button className="btn btn-info" onClick={handleSubmit}>
                        <CheckIcon className='h-5 w-5' />
                        Set Selected
                    </button>
                </div>
            }>
                <div className='h-[28rem]'>
                    <div className='grid grid-cols-1 gap-3'>
                        <div className="grid grid-cols-2 gap-5">
                            <div className='flex flex-col gap-1'>
                                <label className="text-sm">Name</label>
                                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder='John Doe' className='input input-bordered' />
                            </div>
                        </div>
                        <div className='grid grid-cols-3 gap-5 max-h-[26rem] custom-scrollbar overflow-y-auto'>
                            {place && (
                                <SearchResultCard
                                    id={place.id}
                                    avatar={place.avatar}
                                    title={place.name}
                                    subtitle={`${place.district.name}, ${place.district.division.name}`}
                                    selected={selectedPlace?.id == place.id}
                                    handleClick={handleSelectedPlace}
                                />
                            )}
                            {!(isLoading || error || !data) && data.data.data.filter(x => x.id != place?.id).map((e, i) => (
                                <SearchResultCard
                                    id={e.id}
                                    avatar={e.avatar}
                                    title={e.name}
                                    subtitle={`${e.district.name}, ${e.district.division.name}`}
                                    selected={selectedPlace?.id == e.id}
                                    handleClick={handleSelectedPlace}
                                    key={i}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default MultiplePlaceSelect