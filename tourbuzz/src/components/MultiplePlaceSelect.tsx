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
    places,
    setPlaces
}: {
    places: PlaceType[],
    setPlaces: (props: PlaceType[]) => void
}) => {
    const [name, setName] = useState("")
    const [dName] = useDebounce(name, 500);

    const [open, setOpen] = useState(false);
    const [selectedPlaces, setSelectedPlaces] = useState<PlaceType[]>([])

    const { isLoading, error, data } = useQuery<MultiplePlaceSelectData, Error>({
        queryKey: ['places', dName],
        queryFn: () => getPlaces({ pageNo: 1, pageSize: 50, name: dName })
    })

    const handleSelectedPlace = (id: number) => {
        const alreadyExists = selectedPlaces.find(e => e.id == id)
        const foundFromData = data?.data.data.find(e => e.id == id)
        if (alreadyExists) {
            const newData = selectedPlaces.filter(e => e.id != id)
            setSelectedPlaces([...newData])
        } else {
            if(!foundFromData) return;
            setSelectedPlaces([...selectedPlaces, foundFromData])
        }
    }

    const handleOpen = (_?: any) => {
        setOpen(true)
        setSelectedPlaces(places)
    }

    const handleClose = () => {
        setOpen(false)
        setSelectedPlaces([])
    };

    const handleSubmit = () => {
        if (selectedPlaces.length == 0) return;
        setPlaces([...selectedPlaces])
        handleClose()
    }

    return (
        <div>
            <div className="btn btn-outline no-animation w-full flex space-2 h-auto p-3 justify-start" onClick={handleOpen}>
                {places.length == 0 ? (
                <div>Click To Select</div>
                ) : (
                    <>
                        {places.map((e, i) => <div className='badge badge-primary' key={i}>{e.name}</div>)}
                    </>
                )}
            </div>
            <Modal open={open} handleClose={handleClose} title='Select Place' width='70rem' footer={
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
                            {places.map((place, i) => (
                                <SearchResultCard
                                    id={place.id}
                                    avatar={place.avatar}
                                    title={place.name}
                                    subtitle={`${place.district.name}, ${place.district.division.name}`}
                                    selected={selectedPlaces.map(e => e.id).includes(place.id)}
                                    handleClick={handleSelectedPlace}
                                    key={i}
                                />
                            ))}
                            {!(isLoading || error || !data) && data.data.data.filter(x => !places.map(e => e.id).includes(x.id)).map((e, i) => (
                                <SearchResultCard
                                    id={e.id}
                                    avatar={e.avatar}
                                    title={e.name}
                                    subtitle={`${e.district.name}, ${e.district.division.name}`}
                                    selected={selectedPlaces.map(e => e.id).includes(e.id)}
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