import { HotelType, ImageType, PlaceType, parseErrorMessage } from '@src/types';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { toast } from 'react-toastify';
import { QueueListIcon } from '@heroicons/react/24/outline';
import TourLogUpdateForm from './TourLogUpdateForm';
import TourLogCreateForm from './TourLogCreateForm';
import { postTourLog } from '@src/functions/api';

export interface TourLogUpdateState {
    tours_id: number
    hotel: HotelType | null;
    title: string;
    description: string;
    date: string;
    places: PlaceType[];
    images: ImageType[]
}

export interface TourLogCreateState {
    hotel: HotelType | null;
    title: string;
    description: string;
    date: string;
    places: PlaceType[];
    images: ImageType[]
}

const initialState: TourLogCreateState = {
    hotel: null,
    title: "",
    description: "",
    date: "",
    places: [],
    images: []
}

const defaultActiveIndex = -1;

export interface TourLogUpdateRef {
    getData: () => TourLogUpdateState[];
    updateData: (props: TourLogUpdateState[]) => void;
}

const TourLogUpdateCard = forwardRef<TourLogUpdateRef, { tourId: number }>((props, ref) => {
    const [tourLogData, setTourLogData] = useState<TourLogUpdateState[]>([])
    const [activeIndex, setActiveIndex] = useState(defaultActiveIndex)

    const [showEditor, setShowEditor] = useState(false)
    const [editorData, setEditorData] = useState<TourLogCreateState>({ ...initialState })

    useImperativeHandle(ref, () => ({
        getData() {
            return tourLogData;
        },
        updateData(props: TourLogUpdateState[]) {
            setTourLogData(props)
        }
    }))

    const isActiveDataInValid = () => {
        if (activeIndex == defaultActiveIndex) {
            return false;
        }
        if (tourLogData[activeIndex].title.length < 3 ||
            tourLogData[activeIndex].date.length < 10 ||
            tourLogData[activeIndex].description.length < 5
        ) {
            return true;
        }
        return false;
    }

    const handleSetData = ({ data, index }: { data: TourLogUpdateState, index: number }) => {
        const newData = [...tourLogData];
        newData[index] = data;
        setTourLogData(newData);
    };

    const handleSetEditorData = ({ data, index }: { data: TourLogCreateState, index: number }) => {
        setEditorData({ ...data });
    };

    const editData = (index: number) => {
        if (showEditor || isActiveDataInValid()) {
            toast.warning("Please complete the active Itinerary first")
            return;
        }
        setActiveIndex(index)
    }

    const handleEditorIndex = (index: number) => {
        return;
    }

    const deleteData = (index: number) => {
        const newData = tourLogData.filter((_item, i) => index !== i);
        setTourLogData([...newData])
    }

    const cancel = (index: number) => {
        const newData = tourLogData.filter((_item, i) => index !== i);
        setTourLogData([...newData])
        setActiveIndex(defaultActiveIndex)
    }

    const cancelEditor = () => {
        setShowEditor(false)
        setEditorData({ ...initialState })
    }

    const complete = () => {
        if (isActiveDataInValid()) {
            toast.warning("Please complete the active Itinerary first")
            return;
        }
        setActiveIndex(defaultActiveIndex)
    }

    const completeEditor = () => {
        postTourLog({
            tours_id: props.tourId,
            hotels_id: editorData.hotel?.id ?? null,
            title: editorData.title,
            description: editorData.description,
            date: editorData.date,
            place_ids: editorData.places.map(e => e.id),
            image_ids: editorData.images.map(e => e.id)
        }).then(res => {
            if (res.error) {
                toast.error("Tour log create failed 🤦‍♂️")
                toast.error(parseErrorMessage(res.error).message)
            } else {
                toast.success("Tour log created 💪")
                const newData = [...tourLogData];
                newData.push(res.data);
                setTourLogData(newData);
                setActiveIndex(defaultActiveIndex)
            }
        })
    }

    const addAnother = () => {
        setActiveIndex(defaultActiveIndex)
        setShowEditor(true)
    }

    return (
        <div className="grid grid-cols-1 gap-3 p-5 card bg-base-200">
            <div className='flex gap-2 items-center'><QueueListIcon className='h-5 w-5' /> Tour Logs</div>
            {tourLogData.map((e, i) => (
                <TourLogUpdateForm
                    data={e}
                    setData={handleSetData}
                    editData={editData}
                    deleteData={deleteData}
                    active={activeIndex == i}
                    cancel={cancel}
                    complete={complete}
                    index={i}
                    key={i}
                />
            ))}
            {showEditor && (
                <TourLogCreateForm
                    data={editorData}
                    setData={handleSetEditorData}
                    editData={handleEditorIndex}
                    deleteData={handleEditorIndex}
                    active={true}
                    cancel={cancelEditor}
                    complete={completeEditor}
                    index={0}
                />
            )}
            <button className="btn btn-primary" onClick={addAnother}>
                Add Tour Day By Day Itinerary
            </button>
        </div>
    )
})

export default TourLogUpdateCard