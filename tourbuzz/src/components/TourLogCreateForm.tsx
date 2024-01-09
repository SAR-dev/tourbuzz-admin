import { MAX_TOUR_LOG_IMAGE_COUNT } from '@src/constants/values';
import { ImageType, PlaceType } from '@src/types';
import { toast } from 'react-toastify';
import Image from './Image';
import { PhotoIcon } from "@heroicons/react/24/outline"
import { TrashIcon } from "@heroicons/react/24/solid";
import ImageUploader from './ImageUploader';
import ReactInputMask from 'react-input-mask';
import MultiplePlaceSelect from './MultiplePlaceSelect';

export interface TourLogCreateState {
    hotels_id: number | null;
    title: string;
    description: string;
    date: string;
    places: PlaceType[];
    images: ImageType[]
}

const TourLogCreateForm = ({
    active,
    index,
    data,
    setData
} : {
    active: boolean,
    index: number,
    data: TourLogCreateState,
    setData: ({data, index} : {data: TourLogCreateState, index: number}) => void
}) => {
    const setPlaces = (places: PlaceType[]) => {
        setData({data: { ...data, places }, index})
    }

    const setImages = (image: ImageType) => {
        if (data.images.length >= MAX_TOUR_LOG_IMAGE_COUNT) {
            toast.info("Maximum image uploaded")
        }
        setData({data: { ...data, images: [...data.images, image] }, index})
    }

    const removeImage = (id: number) => {
        setData({data: { ...data, images: [...data.images.filter(e => e.id !== id)] }, index})
    }

    return (
        <div className="grid grid-cols-1 gap-3 p-5 card border border-base-300">
            {active ? (
                <div className="grid grid-cols-2 gap-3">
                    <div className='w-full'>
                        <div className="grid grid-cols-3 gap-3">
                            {data.images.map((e, i) => (
                                <div className="h-52 w-full relative group" key={i}>
                                    <Image image={e} className="h-52 w-full object-cover card" />
                                    <div className="absolute top-0 left-0 h-full w-full bg-red-500/50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition ease-in-out">
                                        <TrashIcon className="h-10 w-10 cursor-pointer text-white" onClick={() => removeImage(e.id)} />
                                    </div>
                                </div>
                            ))}
                            {[...Array(MAX_TOUR_LOG_IMAGE_COUNT - data.images.length)].map((_e, i) => (
                                <div className="h-52 w-full border border-base-300 card bg-base-100 justify-center items-center" key={i}>
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
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="label">Travel Date</label>
                                    <ReactInputMask mask="99/99/9999" onChange={e => setData({data: {...data, date: e.target.value}, index})} value={data.date} className="input input-bordered w-full" placeholder='yyyy/mm/dd hh:mm' />
                                </div>
                                <div>
                                    <label className="label">Itinerary Title</label>
                                    <input value={data.title} onChange={e => setData({data: { ...data, title: e.target.value }, index})} type="text" placeholder="Title" className="input input-bordered w-full" />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label className="label">Travel Plan Description</label>
                                <textarea value={data.description} onChange={e => setData({data: { ...data, description: e.target.value }, index})} rows={10} placeholder="Description" className="textarea textarea-bordered overflow-y-auto custom-scrollbar placeholder:text-base text-base resize-none" />
                            </div>
                            <div>
                                <label className="label">Targeted Places</label>
                                <MultiplePlaceSelect places={data.places} setPlaces={setPlaces} />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='grid grid-cols-1 gap-3'>
                    Tour Log
                </div>
            )}
        </div>
    )
}

export default TourLogCreateForm