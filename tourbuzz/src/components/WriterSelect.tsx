import { getWriters } from '@src/functions/api'
import { WriterType } from '@src/constants/types'
import { useState } from 'react'
import { useQuery } from 'react-query'
import Modal from './Modal'
import classNames from 'classnames'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { Pagination } from './Pagination'
import Image from './Image'
import { useDebounce } from 'use-debounce';

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

function WriterSelect({ writer, setWriter }: { writer: WriterType | null, setWriter: (props: WriterType) => void }) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [open, setOpen] = useState(false);

    const [dName] = useDebounce(name, 500);
    const [dEmail] = useDebounce(email, 500);
    const [selectedWriter, setSelectedWriter] = useState<WriterType | null>(null)

    const handleOpen = () => {
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

    const { isLoading, error, data } = useQuery<WriterData, Error>({
        queryKey: ['writers', dName, dEmail],
        queryFn: () => getWriters({ pageNo: 1, pageSize: 50, name: dName, email: dEmail })
    })

    if (isLoading || error || !data) return;

    return (
        <div>
            <button className="btn btn-primary" onClick={handleOpen}>
                {writer == null ? "Select Writer" : `Writer: ${writer.name}`}
            </button>
            <Modal open={open} handleClose={handleClose} title='Select Writer' width='50rem' footer={
                <div className='flex justify-between w-full'>
                    <button className="btn btn-outline" onClick={handleClose}>
                        <ArrowLeftIcon className='h-5 w-5' />
                        Go Back
                    </button>
                    <button className="btn btn-info" onClick={handleSubmit}>Set Selected</button>
                </div>
            }>
                <div className='h-[32rem]'>
                    <div className="grid grid-cols-1 gap-5">
                        <div className="grid grid-cols-2 gap-5">
                            <div className='flex flex-col gap-1'>
                                <label className="text-sm">Name</label>
                                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder='Name' className='input input-bordered' />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label className="text-sm">Email</label>
                                <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' className='input input-bordered' />
                            </div>
                        </div>
                        <div className='grid grid-cols-3 gap-5 max-h-[28rem] overflow-y-auto'>
                            {data.data.data.map((e, i) => (
                                <div className={classNames({
                                    "card flex flex-row items-center gap-3 p-3 border border-base-300 cursor-pointer": true,
                                    "bg-primary text-primary-content": selectedWriter?.id == e.id,
                                    "bg-base-200 hover:bg-base-300": selectedWriter?.id != e.id
                                })}
                                    onClick={() => setSelectedWriter(e)}
                                    key={i}
                                >
                                    <div className='w-12 flex-shrink-0'>
                                        <Image className='h-12 w-16 object-cover card' src={e.avatar.thumbnail_url} />
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="font-semibold">{e.name}</div>
                                        <div className="text-sm">{e.email}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default WriterSelect