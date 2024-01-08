import { useState } from 'react';

export interface TourPackageCreateState {
    title: string;
    description: string;
    price: number | null;
}

const initialState: TourPackageCreateState = {
    title: "",
    description: "",
    price: null
}

const TourPackageCreateCard = () => {
    const [tourPackage, setTourPackage] = useState<TourPackageCreateState>({ ...initialState })
    const [tourPackageData, setTourPackageData] = useState<TourPackageCreateState[]>([])

    return (
        <div>TourPackageCreateCard</div>
    )
}

export default TourPackageCreateCard