import { getWriters } from '@src/functions/api'
import { WriterType } from '@src/types';
import { useState } from 'react'
import { useQuery } from 'react-query'
import Modal from './Modal'
import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/solid';
import { useDebounce } from 'use-debounce';
import SearchResultCardWithImage from './SearchResultCardWithImage'

interface WriterData {
    data: {
        data: WriterType[]
        page_no: number
        page_size: number
        has_prev: boolean
        has_next: boolean
        total_result: number
        total_pages: number
    }
}

const WriterSelect = ({
    writer,
    setWriter
}: {
    writer: WriterType | null,
    setWriter: (props: WriterType) => void
}) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [dName] = useDebounce(name, 500);
    const [dEmail] = useDebounce(email, 500);

    const [open, setOpen] = useState(false);
    const [selectedWriter, setSelectedWriter] = useState<WriterType | null>(null)

    const { isLoading, error, data } = useQuery<WriterData, Error>({
        queryKey: ['writers', dName, dEmail],
        queryFn: () => getWriters({ pageNo: 1, pageSize: 50, name: dName, email: dEmail })
    })

    const handleSelectedWriter = (id: number) => {
        const found = data?.data.data.find(e => e.id == id)
        if (!found || writer?.id == id) return;
        setSelectedWriter(found)
    }

    const handleOpen = (_?: any) => {
        setOpen(true)
        setSelectedWriter(writer)
    }

    const handleClose = () => {
        setOpen(false)
        setSelectedWriter(null)
    };

    const handleSubmit = () => {
        if (!selectedWriter) return;
        setWriter(selectedWriter)
        handleClose()
    }

    return (
        <div>
            {writer ? (
                <SearchResultCardWithImage 
                    id={writer.id}
                    avatar={writer.avatar}
                    title={writer.name}
                    subtitle={writer.email}
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
                            {writer && (
                                <SearchResultCardWithImage
                                    id={writer.id}
                                    avatar={writer.avatar}
                                    title={writer.name}
                                    subtitle={writer.email}
                                    selected={selectedWriter?.id == writer.id}
                                    handleClick={handleSelectedWriter}
                                />
                            )}
                            {!(isLoading || error || !data) && data.data.data.filter(x => x.id != writer?.id).map((e, i) => (
                                <SearchResultCardWithImage
                                    id={e.id}
                                    avatar={e.avatar}
                                    title={e.name}
                                    subtitle={e.email}
                                    selected={selectedWriter?.id == e.id}
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

export default WriterSelect