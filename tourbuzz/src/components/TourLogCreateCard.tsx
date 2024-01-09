import { ImageType, PlaceType } from '@src/types';
import { useState } from 'react';
import TourLogCreateForm from './TourLogCreateForm';
import { toast } from 'react-toastify';

export interface TourLogCreateState {
    hotels_id: number | null;
    title: string;
    description: string;
    date: string;
    places: PlaceType[];
    images: ImageType[]
}

const initialState: TourLogCreateState = {
    hotels_id: null,
    title: "",
    description: "",
    date: "",
    places: [],
    images: []
}

const TourLogCreateCard = () => {
    const [tourLogData, setTourLogData] = useState<TourLogCreateState[]>([])
    const [activeIndex, setActiveIndex] = useState(-1)

    const isActiveDataInValid = () => {
        if(tourLogData.length == 0) return false;
        if (tourLogData[activeIndex].title.length < 3 ||
            tourLogData[activeIndex].date.length < 10 ||
            tourLogData[activeIndex].description.length < 5
        ) {
            return false;
        }
        return true;
    }
    const addAnother = () => {
        if (isActiveDataInValid()) {
            toast.warning("Please complete the active Itinerary first")
            return;
        }
        setActiveIndex(tourLogData.length)
        setTourLogData([...tourLogData, initialState])
    }

    const setData = ({ data, index }: { data: TourLogCreateState, index: number }) => {
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
        setActiveIndex(-1)
    }

    return (
        <div className="grid grid-cols-1 gap-3 p-5 card bg-base-200">
            {tourLogData.map((e, i) => (
                <TourLogCreateForm 
                    data={e} 
                    setData={setData} 
                    editData={editData} 
                    deleteData={deleteData} 
                    active={activeIndex == i} 
                    cancel={cancel}
                    index={i} 
                    key={i} 
                />
            ))}
            <button className="btn btn-primary" onClick={addAnother}>Add Tour Day By Day Itinerary</button>
        </div>
    )
}

export default TourLogCreateCard