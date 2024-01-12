import { HotelType, ImageType, PlaceType } from '@src/types';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { toast } from 'react-toastify';
import { QueueListIcon } from '@heroicons/react/24/outline';
import TourLogUpdateForm from './TourLogUpdateForm';

export interface TourLogUpdateState {
    hotel: HotelType | null;
    title: string;
    description: string;
    date: string;
    places: PlaceType[];
    images: ImageType[]
}

const initialState: TourLogUpdateState = {
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

const TourLogUpdateCard = forwardRef<TourLogUpdateRef>((_props, ref) => {
    const [tourLogData, setTourLogData] = useState<TourLogUpdateState[]>([])
    
    const [activeIndex, setActiveIndex] = useState(defaultActiveIndex)

    useImperativeHandle(ref, () => ({
        getData() {
            return tourLogData;
        },
        updateData(props: TourLogUpdateState[]) {
            setTourLogData(props)
        }
    }))

    const isActiveDataInValid = () => {
        if(activeIndex == defaultActiveIndex){
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
    
    const addAnother = () => {
        if (isActiveDataInValid()) {
            toast.warning("Please complete the active Itinerary first")
            return;
        }
        setActiveIndex(tourLogData.length)
        setTourLogData([...tourLogData, initialState])
    }

    const handleSetData = ({ data, index }: { data: TourLogUpdateState, index: number }) => {
        // first create the tour log here then update data
        const newData = [...tourLogData];
        newData[index] = data;
        setTourLogData(newData);
    };

    const editData = (index: number) => {
        if (isActiveDataInValid()) {
            toast.warning("Please complete the active Itinerary first")
            return;
        }
        setActiveIndex(index)
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

    const complete = () => {
        if (isActiveDataInValid()) {
            toast.warning("Please complete the active Itinerary first")
            return;
        }
        setActiveIndex(defaultActiveIndex)
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
            <button className="btn btn-primary" onClick={addAnother}>Add Tour Day By Day Itinerary</button>
        </div>
    )
})

export default TourLogUpdateCard