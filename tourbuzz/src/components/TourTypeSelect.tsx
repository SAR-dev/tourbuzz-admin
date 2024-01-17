import { getTourTypes } from '@src/functions/api';
import { TypeOfTour } from '@src/types';
import { useState } from 'react'
import { useQuery } from 'react-query'
import Modal from './Modal'
import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/solid';
import { useDebounce } from 'use-debounce';
import SearchResultCardWithoutImage from './SearchResultCardWithoutImage';
import classNames from 'classnames';

interface TourTypeData {
    data: {
        data: TypeOfTour[]
        page_no: number
        page_size: number
        has_prev: boolean
        has_next: boolean
        total_result: number
        total_pages: number
    }
}

const TourTypeSelect = ({
    tourType,
    setTourType
}: {
    tourType: TypeOfTour | null,
    setTourType: (props: TypeOfTour) => void
}) => {
    const [name, setName] = useState("")
    const [dName] = useDebounce(name, 500);

    const [open, setOpen] = useState(false);
    const [selectedTourType, setSelectedTourType] = useState<TypeOfTour | null>(null)

    const { isLoading, error, data } = useQuery<TourTypeData, Error>({
        queryKey: ['tour-types', dName],
        queryFn: () => getTourTypes({ pageNo: 1, pageSize: 50, name: dName })
    })

    const handleSelectedTourType = (id: number) => {
        const found = data?.data.data.find(e => e.id == id)
        if (!found || tourType?.id == id) return;
        setSelectedTourType(found)
    }

    const handleOpen = (_?: any) => {
        setOpen(true)
        setSelectedTourType(tourType)
    }

    const handleClose = () => {
        setOpen(false)
        setSelectedTourType(null)
    };

    const handleSubmit = () => {
        if (!selectedTourType) return;
        setTourType(selectedTourType)
        handleClose()
    }

    return (
        <div>
            <button 
                className={classNames({
                    "btn w-full text-base": true,
                    "btn-neutral": !tourType,
                    "btn-outline justify-start": !!tourType
                })} 
                onClick={handleOpen}
            >
                {tourType ? tourType.name : "Click to Select"}
            </button>
            <Modal open={open} handleClose={handleClose} title='Select Tour Type' width='50rem' footer={
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
                            {tourType && (
                                <SearchResultCardWithoutImage
                                    id={tourType.id}
                                    title={tourType.name}
                                    subtitle={tourType.slug}
                                    selected={selectedTourType?.id == tourType.id}
                                    handleClick={handleSelectedTourType}
                                />
                            )}
                            {!(isLoading || error || !data) && data.data.data.filter(x => x.id != tourType?.id).map((e, i) => (
                                <SearchResultCardWithoutImage
                                    id={e.id}
                                    title={e.name}
                                    subtitle={e.slug}
                                    selected={selectedTourType?.id == e.id}
                                    handleClick={handleSelectedTourType}
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

export default TourTypeSelect