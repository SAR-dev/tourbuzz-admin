import { MAX_TOUR_LOG_IMAGE_COUNT } from '@src/constants/values';
import { HotelType, ImageType, PlaceType } from '@src/types';
import { toast } from 'react-toastify';
import Image from './Image';
import { CalendarIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { CheckIcon, TrashIcon } from "@heroicons/react/24/solid";
import ImageUploader from './ImageUploader';
import ReactInputMask from 'react-input-mask';
import MultiplePlaceSelect from './MultiplePlaceSelect';
import classNames from 'classnames';
import MarkdownEditor from './MarkdownEditor';
import HotelSelect from './HotelSelect';
import { TourLogUpdateState } from './TourLogUpdateCard';
import { timestampToDDMMYYYY } from '@src/functions/helpers';
import DeleteButton from './DeleteButton';

const TourLogUpdateForm = ({
    active,
    index,
    data,
    setData,
    editData,
    deleteData,
    complete
}: {
    active: boolean,
    index: number,
    data: TourLogUpdateState,
    setData: ({ data, index }: { data: TourLogUpdateState, index: number }) => void,
    editData: (index: number) => void,
    deleteData: (index: number) => void,
    complete: () => void
}) => {
    const setPlaces = (places: PlaceType[]) => {
        setData({ data: { ...data, places }, index })
    }

    const setImages = (image: ImageType) => {
        if (data.images.length >= MAX_TOUR_LOG_IMAGE_COUNT) {
            toast.info("Maximum image uploaded")
        }
        setData({ data: { ...data, images: [...data.images, image] }, index })
    }

    const removeImage = (id: number) => {
        setData({ data: { ...data, images: [...data.images.filter(e => e.id !== id)] }, index })
    }

    const setMdDesc = (value: string) => {
        setData({ data: { ...data, description: value }, index })
    }

    const setHotel = (value: HotelType) => {
        setData({ data: { ...data, hotel: value }, index })
    }

    return (
        <div className={classNames({
            "grid grid-cols-1 gap-3 p-5 card bg-base-100 relative": true,
            "bg-base-100": !active
        })}>
            {active ? (
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex space-x-2  absolute top-0 right-0 btn-xs m-2">
                        <button className="btn btn-sm btn-info" onClick={complete}>
                            <CheckIcon className='h-4 w-4' />
                            Save
                        </button>
                        <DeleteButton className='btn btn-sm btn-warning' handleDelete={() => deleteData(index)} />
                    </div>
                    <div className='w-full'>
                        <div className="grid grid-cols-2 gap-3 mb-3">
                            <div>
                                <label className="label">Travel Date</label>
                                <ReactInputMask mask="99/99/9999" onChange={e => setData({ data: { ...data, date: e.target.value }, index })} value={data.date} className="input input-bordered w-full" placeholder='DD/MM/YYYY' />
                            </div>
                            <div>
                                <label className="label">Itinerary Title</label>
                                <input value={data.title} onChange={e => setData({ data: { ...data, title: e.target.value }, index })} type="text" placeholder="Title" className="input input-bordered w-full" />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            {data.images.map((e, i) => (
                                <div className="h-40 w-full relative group" key={i}>
                                    <Image image={e} className="h-40 w-full object-cover card" />
                                    <div className="absolute top-0 left-0 h-full w-full bg-red-500/50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition ease-in-out">
                                        <TrashIcon className="h-10 w-10 cursor-pointer text-white" onClick={() => removeImage(e.id)} />
                                    </div>
                                </div>
                            ))}
                            {[...Array(MAX_TOUR_LOG_IMAGE_COUNT - data.images.length)].map((_e, i) => (
                                <div className="h-40 w-full border border-base-300 card bg-base-100 justify-center items-center" key={i}>
                                    <PhotoIcon className="h-10 w-10" />
                                </div>
                            ))}
                            <div className="col-span-3">
                                <ImageUploader title="Upload Image" setImage={setImages} />
                            </div>
                        </div>
                    </div>
                    <div className='w-full'>
                        <div className="grid grid-cols-1 gap-3">
                            <div className="flex flex-col">
                                <label className="label">Travel Plan Description</label>
                                <MarkdownEditor
                                    value={data.description}
                                    setValue={setMdDesc}
                                    placeholder="Start writing details in Markdown"
                                    minimal
                                    height='25.5rem'
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="label">Targeted Places</label>
                        <MultiplePlaceSelect places={data.places} setPlaces={setPlaces} />
                    </div>
                    <div>
                        <label className="label">Select Hotel</label>
                        <HotelSelect hotel={data.hotel} setHotel={setHotel} />
                    </div>
                </div>
            ) : (
                <div className='w-full flex items-center'>
                    <CalendarIcon className='h-5 w-5' />
                    <div className="font-semibold ml-2 mr-4">{timestampToDDMMYYYY(data.date)}</div>
                    <div>{data.title}</div>
                    <div className="ml-auto">
                        <button className="btn btn-sm" onClick={() => editData(index)}>Edit</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TourLogUpdateForm