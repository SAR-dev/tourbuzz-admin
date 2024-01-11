import { MAX_ARTICLE_IMAGE_COUNT, MAX_TOUR_IMAGE_COUNT, TOUR_DATA_CREATE_CACHE_KEY } from '@src/constants/values';
import { generateSlug } from '@src/functions/helpers';
import { ImageType, OrganizerType, TypeOfTourData } from '@src/types';
import { forwardRef, useImperativeHandle } from 'react';
import { toast } from 'react-toastify';
import Image from './Image';
import ImageUploader from './ImageUploader';
import MarkdownEditor from './MarkdownEditor';
import ReactInputMask from 'react-input-mask';
import { getTourTypes } from '@src/functions/api';
import { useQuery } from 'react-query';
import OrganizerSelect from './OrganizerSelect';
import { PhotoIcon } from "@heroicons/react/24/outline"
import { TrashIcon } from "@heroicons/react/24/solid";
import useLocalStorageState from 'use-local-storage-state'

export interface TourCreateState {
    tour_types_id: number;
    organizer: OrganizerType | null;
    avatar: ImageType | null;
    title: string;
    slug: string;
    md_desc: string;
    summary: string;
    group_size: string;
    group_info: string;
    services: string;
    transports: string;
    cancel_ins: string;
    start_ins: string;
    finish_ins: string;
    start_at: string;
    finish_at: string;
    last_sell_at: string;
    images: ImageType[];
}

export interface TourCreateRef {
    getData: () => TourCreateState;
    clearData: () => void;
}

const initialState: TourCreateState = {
    tour_types_id: 0,
    organizer: null,
    avatar: null,
    title: '',
    slug: '',
    md_desc: '',
    summary: '',
    group_size: '',
    group_info: '',
    services: '',
    transports: '',
    cancel_ins: '',
    start_ins: '',
    finish_ins: '',
    start_at: '',
    finish_at: '',
    last_sell_at: '',
    images: [],
}

const TourCreateCard = forwardRef<TourCreateRef>((_props, ref) => {
    const [data, setData, { removeItem }] = useLocalStorageState<TourCreateState>(TOUR_DATA_CREATE_CACHE_KEY, {
        defaultValue: initialState
    })

    useImperativeHandle(ref, () => ({
        getData() {
            return data;
        },
        clearData() {
            removeItem()
        }
    }))

    const setOrganizer = (organizer: OrganizerType) => {
        setData({ ...data, organizer })
    }

    const { data: typeOfTourData } = useQuery<TypeOfTourData, Error>({
        queryKey: ['tour-types'],
        queryFn: () => getTourTypes()
    })

    const setImages = (image: ImageType) => {
        if (data.images.length >= MAX_ARTICLE_IMAGE_COUNT) {
            toast.info("Maximum image uploaded")
        }
        setData({ ...data, images: [...data.images, image] })
    }

    const removeImage = (id: number) => {
        setData({ ...data, images: [...data.images.filter(e => e.id !== id)] })
    }

    const handleTitleChange = (title: string) => {
        setData({ ...data, title: title, slug: generateSlug(title) })
    }

    const setMdDesc = (value: string) => {
        setData({ ...data, md_desc: value })
    }

    const setServices = (value: string) => {
        setData({ ...data, services: value })
    }

    const setCancelIns = (value: string) => {
        setData({ ...data, cancel_ins: value })
    }

    const setStartIns = (value: string) => {
        setData({ ...data, start_ins: value })
    }

    const setFinishIns = (value: string) => {
        setData({ ...data, finish_ins: value })
    }

    const setAvatar = (image: ImageType) => {
        setData({ ...data, avatar: image })
    }

    return (
        <div className="grid grid-cols-2 gap-3 p-5 card bg-base-200">
            <div>
                <label className="label">Tour Title</label>
                <input value={data.title} onChange={e => handleTitleChange(e.target.value)} type="text" placeholder="Title" className="input input-bordered w-full" />
            </div>
            <div>
                <label className="label">SEO Friendly Slug</label>
                <input value={data.slug} onChange={e => setData({ ...data, slug: e.target.value })} type="text" placeholder="Slug" className="input input-bordered w-full" />
            </div>
            <div>
                <label className="label">Group Size</label>
                <input value={data.group_size} onChange={e => setData({ ...data, group_size: e.target.value })} type="text" placeholder="Group Size" className="input input-bordered w-full" />
            </div>
            <div>
                <label className="label">Group Info</label>
                <input value={data.group_info} onChange={e => setData({ ...data, group_info: e.target.value })} type="text" placeholder="Group Info" className="input input-bordered w-full" />
            </div>
            <div>
                <label className="label">Tour Start Time</label>
                <ReactInputMask mask="99/99/9999 99:99" onChange={e => setData({ ...data, start_at: e.target.value })} value={data.start_at} className="input input-bordered w-full" placeholder='dd/mm/yyyy hh:mm' />
            </div>
            <div>
                <label className="label">Tour Finish Time</label>
                <ReactInputMask mask="99/99/9999 99:99" onChange={e => setData({ ...data, finish_at: e.target.value })} value={data.finish_at} className="input input-bordered w-full" placeholder='dd/mm/yyyy hh:mm' />
            </div>
            <div>
                <label className="label">Transportations</label>
                <input value={data.transports} onChange={e => setData({ ...data, transports: e.target.value })} type="text" placeholder="Transportations" className="input input-bordered w-full" />
            </div>
            <div>
                <label className="label">Ticket Last Sell Time</label>
                <ReactInputMask mask="99/99/9999 99:99" onChange={e => setData({ ...data, last_sell_at: e.target.value })} value={data.last_sell_at} className="input input-bordered w-full" placeholder='dd/mm/yyyy hh:mm' />
            </div>
            <div className="flex flex-col">
                <label className="label">Reader-friendly Summary</label>
                <textarea value={data.summary} onChange={e => setData({ ...data, summary: e.target.value })} rows={13} placeholder="Summary" className="textarea textarea-bordered overflow-y-auto custom-scrollbar placeholder:text-base text-base resize-none" />
            </div>
            <div>
                <label className="label">Tour Main Poster</label>
                <div className="p-3 bg-base-100 card border border-base-300">
                    <div className="h-60 w-full card border border-base-300 flex justify-center items-center bg-base-100 mb-2">
                        {data.avatar ? (
                            <Image image={data.avatar} className="h-60 w-full object-contain object-center" />
                        ) : (
                            <PhotoIcon className="h-20 w-20" />
                        )}
                    </div>
                    <ImageUploader title="Upload Poster" setImage={setAvatar} />
                </div>
            </div>
            <div className='col-span-2'>
                <div className="grid grid-cols-5 gap-3">
                    {data.images.map((e, i) => (
                        <div className="h-52 w-full relative group" key={i}>
                            <Image image={e} className="h-52 w-full object-cover card" />
                            <div className="absolute top-0 left-0 h-full w-full bg-red-500/50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition ease-in-out">
                                <TrashIcon className="h-10 w-10 cursor-pointer text-white" onClick={() => removeImage(e.id)} />
                            </div>
                        </div>
                    ))}
                    {[...Array(MAX_TOUR_IMAGE_COUNT - data.images.length)].map((_e, i) => (
                        <div className="h-52 w-full border border-base-300 card bg-base-100 justify-center items-center" key={i}>
                            <PhotoIcon className="h-10 w-10" />
                        </div>
                    ))}
                    <div className="col-span-5">
                        <ImageUploader title="Upload Image" setImage={setImages} />
                    </div>
                </div>
            </div>
            <div className="col-span-2">
                <label className="label">Start writing details here</label>
                <MarkdownEditor
                    value={data.md_desc}
                    setValue={setMdDesc}
                    placeholder="Start writing details in Markdown"
                />
            </div>
            <div className="flex flex-col">
                <label className="label">Journey Beigin Instructions</label>
                <MarkdownEditor
                    value={data.start_ins}
                    setValue={setStartIns}
                    placeholder="Write in Markdown"
                    minimal
                    height='20rem'
                />
            </div>
            <div className="flex flex-col">
                <label className="label">Journey Finish Instructions</label>
                <MarkdownEditor
                    value={data.finish_ins}
                    setValue={setFinishIns}
                    placeholder="Write in Markdown"
                    minimal
                    height='20rem'
                />
            </div>
            <div>
                <label className="label">Included Services</label>
                <MarkdownEditor
                    value={data.services}
                    setValue={setServices}
                    placeholder="Write in Markdown"
                    minimal
                    height='20rem'
                />
            </div>
            <div>
                <label className="label">Ticket Cancellation</label>
                <MarkdownEditor
                    value={data.cancel_ins}
                    setValue={setCancelIns}
                    placeholder="Write in Markdown"
                    minimal
                    height='20rem'
                />
            </div>
            <div>
                <label className="label">Tour Type</label>
                <select value={data.tour_types_id} onChange={e => setData({ ...data, tour_types_id: Number(e.target.value) })} className="select custom-scrollbar w-full select-bordered">
                    <option disabled selected value={0}>Select Tour Type</option>
                    {typeOfTourData && typeOfTourData.data.map((e) => (
                        <option value={e.id} key={e.id}>{e.name}</option>
                    ))}
                </select>
            </div>
            <div />
            <div>
                <label className="label">Select Organizer</label>
                <OrganizerSelect organizer={data.organizer} setOrganizer={setOrganizer} />
            </div>
        </div>
    )
})

export default TourCreateCard