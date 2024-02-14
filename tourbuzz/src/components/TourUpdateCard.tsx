import { MAX_ARTICLE_IMAGE_COUNT, MAX_TOUR_IMAGE_COUNT } from '@src/constants/values';
import { generateSlug } from '@src/functions/helpers';
import { ImageType, OrganizerType, TypeOfTour } from '@src/types';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { toast } from 'react-toastify';
import Image from './Image';
import ImageUploader from './ImageUploader';
import MarkdownEditor from './MarkdownEditor';
import ReactInputMask from 'react-input-mask';
import OrganizerSelect from './OrganizerSelect';
import { PhotoIcon } from "@heroicons/react/24/outline"
import { PlayCircleIcon, TrashIcon } from "@heroicons/react/24/solid";
import TourTypeSelect from './TourTypeSelect';
import ReactPlayer from 'react-player'
import ImageSelector from './ImageSelector';

export interface TourUpdateState {
    tour_type: TypeOfTour | null;
    organizer: OrganizerType | null;
    avatar: ImageType | null;
    title: string;
    slug: string;
    md_desc: string;
    highlights: string;
    faq: string;
    video_link: string;
    group_size: string;
    group_info: string;
    transports: string;
    cancel_ins: string;
    start_ins: string;
    finish_ins: string;
    start_at: string;
    finish_at: string;
    last_sell_at: string;
    max_ticket_amount: number;
    images: ImageType[];
}

const initialState: TourUpdateState = {
    tour_type: null,
    organizer: null,
    avatar: null,
    title: '',
    slug: '',
    md_desc: '',
    highlights: '',
    faq: '',
    video_link: '',
    group_size: '',
    group_info: '',
    transports: '',
    cancel_ins: '',
    start_ins: '',
    finish_ins: '',
    start_at: '',
    finish_at: '',
    last_sell_at: '',
    max_ticket_amount: 999,
    images: [],
}

export interface TourUpdateRef {
    getData: () => TourUpdateState;
    updateData: (props: TourUpdateState) => void
}

const TourUpdateCard = forwardRef<TourUpdateRef, { tourId: number }>((_tourId, ref) => {
    const [data, setData] = useState<TourUpdateState>({ ...initialState })

    useImperativeHandle(ref, () => ({
        getData() {
            return data;
        },
        updateData(props: TourUpdateState) {
            setData(props)
        }
    }))

    const setOrganizer = (organizer: OrganizerType) => {
        setData({ ...data, organizer })
    }

    const setTourType = (tour_type: TypeOfTour) => {
        setData({ ...data, tour_type })
    }

    const setImages = (image: ImageType) => {
        if (data.images.length >= MAX_TOUR_IMAGE_COUNT) {
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

    const setHighlights = (value: string) => {
        setData({ ...data, highlights: value })
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

    const setFAQ = (value: string) => {
        setData({ ...data, faq: value })
    }

    const setAvatar = (image: ImageType) => {
        setData({ ...data, avatar: image })
    }

    const handleVideoLink = async () => {
        const url = await navigator.clipboard.readText();
        const ok = ReactPlayer.canPlay(url)
        if (ok) {
            setData({ ...data, video_link: url })
        } else {
            toast.error("Sorry, we can not play this video");
        }
    }

    const removeVideoLink = () => {
        setData({ ...data, video_link: "" })
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
                <ReactInputMask mask="99/99/9999 99:99" onChange={e => setData({ ...data, start_at: e.target.value })} value={data.start_at} className="input input-bordered w-full" placeholder='DD/MM/YYYY hh:mm' />
            </div>
            <div>
                <label className="label">Tour Finish Time</label>
                <ReactInputMask mask="99/99/9999 99:99" onChange={e => setData({ ...data, finish_at: e.target.value })} value={data.finish_at} className="input input-bordered w-full" placeholder='DD/MM/YYYY hh:mm' />
            </div>
            <div>
                <label className="label">Transportations</label>
                <input value={data.transports} onChange={e => setData({ ...data, transports: e.target.value })} type="text" placeholder="Transportations" className="input input-bordered w-full" />
            </div>
            <div className="grid grid-cols-2 gap-5">
                <div>
                    <label className="label">Ticket Last Sell Time</label>
                    <ReactInputMask mask="99/99/9999 99:99" onChange={e => setData({ ...data, last_sell_at: e.target.value })} value={data.last_sell_at} className="input input-bordered w-full" placeholder='DD/MM/YYYY hh:mm' />
                </div>
                <div>
                    <label className="label">Max Amount of Ticket</label>
                    <input value={data.max_ticket_amount} onChange={e => setData({ ...data, max_ticket_amount: Number(e.target.value) })} type="number" placeholder="Max Amount of Ticket" className="input input-bordered w-full" />
                </div>
            </div>
            <div>
                <label className="label">Tour Main Poster</label>
                <div className="p-3 bg-base-100 card border border-base-300">
                    <div className="h-72 w-full card border border-base-300 flex justify-center items-center bg-base-100 mb-2">
                        {data.avatar ? (
                            <Image image={data.avatar} className="h-72 w-full object-contain object-center" />
                        ) : (
                            <PhotoIcon className="h-20 w-20" />
                        )}
                    </div>
                    <ImageUploader title="Upload Poster" setImage={setAvatar} />
                </div>
            </div>
            <div>
                <label className="label">Attach a video (Optional)</label>
                <div className="p-3 bg-base-100 card border border-base-300">
                    <div className="w-full aspect-video card border border-base-300 flex justify-center items-center bg-base-100 mb-2">
                        {ReactPlayer.canPlay(data.video_link) && (
                            <ReactPlayer url={data.video_link} height="100%" width="100%" light controls playIcon={
                                <div className='w-full h-full flex items-center justify-center bg-black/50'>
                                    <PlayCircleIcon className='h-16 w-16 text-info shadow-lg rounded-full hover:scale-125 transition duration-300' />
                                </div>
                            } />
                        )}
                    </div>
                    <div className='flex gap-3'>
                        <button className="btn btn-primary w-full flex-1" onClick={handleVideoLink}>
                            Click to paste link
                        </button>
                        <button className="btn btn-warning" onClick={removeVideoLink}>
                            Remove
                        </button>
                    </div>
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
                        <div className="grid grid-cols-2 gap-5">
                            <ImageUploader title="Upload Image" setImage={setImages} />
                            <ImageSelector title="Choose Image" setImage={setImages} />
                        </div>
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
            <div>
                <label className="label">Tour Highlights</label>
                <MarkdownEditor
                    value={data.highlights}
                    setValue={setHighlights}
                    placeholder="Write using bullet points"
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
            <div className='col-span-2'>
                <label className="label">Frequently Asked Questions</label>
                <MarkdownEditor
                    value={data.faq}
                    setValue={setFAQ}
                    placeholder="Write Questions and Answers"
                />
            </div>
            <div className="flex flex-col">
                <label className="label">Pickup Locations and Guidelines</label>
                <MarkdownEditor
                    value={data.start_ins}
                    setValue={setStartIns}
                    placeholder="Write in Markdown"
                    minimal
                    height='20rem'
                />
            </div>
            <div className="flex flex-col">
                <label className="label">Dropoff Locations and Guidelines</label>
                <MarkdownEditor
                    value={data.finish_ins}
                    setValue={setFinishIns}
                    placeholder="Write in Markdown"
                    minimal
                    height='20rem'
                />
            </div>
            <div>
                <label className="label">Tour Type</label>
                <TourTypeSelect tourType={data.tour_type} setTourType={setTourType} />
            </div>
            <div />
            <div>
                <label className="label">Select Organizer</label>
                <OrganizerSelect organizer={data.organizer} setOrganizer={setOrganizer} />
            </div>
        </div>
    )
})

export default TourUpdateCard