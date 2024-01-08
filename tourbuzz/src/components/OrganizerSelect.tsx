import { getOrganizers } from '@src/functions/api';
import { useState } from 'react'
import { useQuery } from 'react-query'
import Modal from './Modal'
import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/solid';
import { useDebounce } from 'use-debounce';
import SearchResultCard from './SearchResultCard'
import { OrganizerType } from '@src/types';

interface OrganizerData {
    data: {
        data: OrganizerType[]
        page_no: number
        page_size: number
        has_prev: boolean
        has_next: boolean
        total_result: number
        total_pages: number
    }
}

const OrganizerSelect = ({
    organizer,
    setOrganizer
}: {
    organizer: OrganizerType | null,
    setOrganizer: (props: OrganizerType) => void
}) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [dName] = useDebounce(name, 500);
    const [dEmail] = useDebounce(email, 500);

    const [open, setOpen] = useState(false);
    const [selectedOrganizer, setSelectedOrganizer] = useState<OrganizerType | null>(null)

    const { isLoading, error, data } = useQuery<OrganizerData, Error>({
        queryKey: ['organizers', dName, dEmail],
        queryFn: () => getOrganizers({ pageNo: 1, pageSize: 50, name: dName, email: dEmail })
    })

    const handleSelectedWriter = (id: number) => {
        const found = data?.data.data.find(e => e.id == id)
        if (!found || organizer?.id == id) return;
        setSelectedOrganizer(found)
    }

    const handleOpen = (_?: any) => {
        setOpen(true)
        setSelectedOrganizer(organizer)
    }

    const handleClose = () => {
        setOpen(false)
        setSelectedOrganizer(null)
    };

    const handleSubmit = () => {
        if (!selectedOrganizer) return;
        setOrganizer(selectedOrganizer)
        handleClose()
    }

    return (
        <div>
            {organizer ? (
                <SearchResultCard 
                    id={organizer.id}
                    avatar={organizer.avatar}
                    title={organizer.name}
                    subtitle={organizer.email}
                    handleClick={handleOpen} 
                    shownInResult={true}
                />
            ) : (
                <button className="btn btn-lg w-full btn-outline text-base" onClick={handleOpen}>
                    Click to Select
                </button>
            )}
            <Modal open={open} handleClose={handleClose} title='Select Writer' width='50rem' footer={
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
                            <div className='flex flex-col gap-1'>
                                <label className="text-sm">Email</label>
                                <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder='john.doe@gmail.com' className='input input-bordered' />
                            </div>
                        </div>
                        <div className='grid grid-cols-3 gap-5 max-h-[26rem] custom-scrollbar overflow-y-auto'>
                            {organizer && (
                                <SearchResultCard
                                    id={organizer.id}
                                    avatar={organizer.avatar}
                                    title={organizer.name}
                                    subtitle={organizer.email}
                                    selected={selectedOrganizer?.id == organizer.id}
                                    handleClick={handleSelectedWriter}
                                />
                            )}
                            {!(isLoading || error || !data) && data.data.data.filter(x => x.id != organizer?.id).map((e, i) => (
                                <SearchResultCard
                                    id={e.id}
                                    avatar={e.avatar}
                                    title={e.name}
                                    subtitle={e.email}
                                    selected={selectedOrganizer?.id == e.id}
                                    handleClick={handleSelectedWriter}
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

export default OrganizerSelect