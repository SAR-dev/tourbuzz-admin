import { ImageType, PlaceType } from '@src/types';
import { useState } from 'react';
import TourLogCreateForm from './TourLogCreateForm';

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

    const addAnother = () => {
        setActiveIndex(tourLogData.length)
        setTourLogData([...tourLogData, initialState])
    }

    const handleChange = ({data, index} : {data: TourLogCreateState, index: number}) => {
        const newData = tourLogData;
        newData[index] = data;
        setTourLogData(newData);
    };

    return (
        <div className="grid grid-cols-1 gap-3 p-5 card bg-base-200">
            {tourLogData.map((_e, i) => (
                <TourLogCreateForm data={tourLogData[i]} setData={handleChange} active={activeIndex == i} index={i} key={i} />
            ))}
            <button className="btn btn-outline" onClick={addAnother}>Add Tour Day By Day Itinerary</button>
        </div>
    )
}

export default TourLogCreateCard