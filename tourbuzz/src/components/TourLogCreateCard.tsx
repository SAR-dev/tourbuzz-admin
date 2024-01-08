import { ImageType, PlaceType } from '@src/types';
import { useState } from 'react';

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
    const [tourLog, setTourLog] = useState<TourLogCreateState>({ ...initialState })
    const [tourLogData, setTourLogData] = useState<TourLogCreateState[]>([])

    return (
        <div>TourLogCreateCard</div>
    )
}

export default TourLogCreateCard