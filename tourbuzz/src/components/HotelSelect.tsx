import { getHotels } from '@src/functions/api'
import { HotelType } from '@src/types';
import { useState } from 'react'
import { useQuery } from 'react-query'
import Modal from './Modal'
import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/solid';
import { useDebounce } from 'use-debounce';
import SearchResultCardWithoutImage from './SearchResultCardWithoutImage';

interface HotelData {
    data: {
        data: HotelType[]
        page_no: number
        page_size: number
        has_prev: boolean
        has_next: boolean
        total_result: number
        total_pages: number
    }
}

const HotelSelect = ({
    hotel,
    setHotel
}: {
    hotel: HotelType | null,
    setHotel: (props: HotelType) => void
}) => {
    const [name, setName] = useState("")
    const [dName] = useDebounce(name, 500);

    const [open, setOpen] = useState(false);
    const [selectedHotel, setSelectedHotel] = useState<HotelType | null>(null)

    const { isLoading, error, data } = useQuery<HotelData, Error>({
        queryKey: ['hotels', dName],
        queryFn: () => getHotels({ pageNo: 1, pageSize: 50, name: dName })
    })

    const handleSelectedHotel = (id: number) => {
        const found = data?.data.data.find(e => e.id == id)
        if (!found || hotel?.id == id) return;
        setSelectedHotel(found)
    }

    const handleOpen = (_?: any) => {
        setOpen(true)
        setSelectedHotel(hotel)
    }

    const handleClose = () => {
        setOpen(false)
        setSelectedHotel(null)
    };

    const handleSubmit = () => {
        if (!selectedHotel) return;
        setHotel(selectedHotel)
        handleClose()
    }

    return (
        <div>
            {hotel ? (
                <SearchResultCardWithoutImage
                    id={hotel.id}
                    title={hotel.name}
                    subtitle={`${hotel.district.name}, ${hotel.district.division.name}`}
                    handleClick={handleOpen} 
                />
            ) : (
                <button className="btn btn-lg w-full btn-outline text-base" onClick={handleOpen}>
                    Click to Select
                </button>
            )}
            <Modal open={open} handleClose={handleClose} title='Select Hotel' width='50rem' footer={
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
                        <div className='grid grid-cols-2 gap-5 max-h-[23rem] custom-scrollbar overflow-y-auto'>
                            {hotel && (
                                <SearchResultCardWithoutImage
                                    id={hotel.id}
                                    title={hotel.name}
                                    subtitle={`${hotel.district.name}, ${hotel.district.division.name}`}
                                    selected={selectedHotel?.id == hotel.id}
                                    handleClick={handleSelectedHotel}
                                />
                            )}
                            {!(isLoading || error || !data) && data.data.data.filter(x => x.id != hotel?.id).map((e, i) => (
                                <SearchResultCardWithoutImage
                                    id={e.id}
                                    title={e.name}
                                    subtitle={`${e.district.name}, ${e.district.division.name}`}
                                    selected={selectedHotel?.id == e.id}
                                    handleClick={handleSelectedHotel}
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

export default HotelSelect