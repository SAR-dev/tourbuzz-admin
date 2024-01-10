import { forwardRef, useImperativeHandle, useState } from 'react';
import { toast } from 'react-toastify';
import { QueueListIcon } from '@heroicons/react/24/outline';
import TourPackageCreateForm from './TourPackageCreateForm';
import { TOUR_PKG_CREATE_CACHE_KEY } from '@src/constants/values';
import useLocalStorageState from 'use-local-storage-state';

export interface TourPackageCreateState {
    title: string;
    description: string;
    additional_info: string;
    price: number | null;
}

const initialState: TourPackageCreateState = {
    title: "",
    description: "",
    additional_info: "",
    price: null
}

const defaultActiveIndex = -1;

export interface TourPackageCreateRef {
    getData: () => TourPackageCreateState[];
    clearData: () => void;
}

const TourPackageCreateCard = forwardRef<TourPackageCreateRef>((_props, ref) => {
    const [tourPackageData, setTourPackageData, { removeItem }] = useLocalStorageState<TourPackageCreateState[]>(TOUR_PKG_CREATE_CACHE_KEY, {
        defaultValue: []
    })
    const [activeIndex, setActiveIndex] = useState(defaultActiveIndex)

    useImperativeHandle(ref, () => ({
        getData() {
            return tourPackageData;
        },
        clearData() {
            setActiveIndex(defaultActiveIndex)
            removeItem()
        }
    }))

    const isActiveDataInValid = () => {
        if (tourPackageData.length == 0) return false;
        if (tourPackageData[activeIndex].title.length < 3 ||
            tourPackageData[activeIndex].description.length < 5 ||
            tourPackageData[activeIndex].price == null ||
            tourPackageData[activeIndex].price == 0
        ) {
            return true;
        }
        return false;
    }

    const addAnother = () => {
        if (isActiveDataInValid()) {
            toast.warning("Please complete the active Package first")
            return;
        }
        setActiveIndex(tourPackageData.length)
        setTourPackageData([...tourPackageData, initialState])
    }

    const handleSetData = ({ data, index }: { data: TourPackageCreateState, index: number }) => {
        const newData = [...tourPackageData];
        newData[index] = data;
        setTourPackageData(newData);
    };

    const editData = (index: number) => {
        if (isActiveDataInValid()) {
            toast.warning("Please complete the active Package first")
            return;
        }
        setActiveIndex(index)
    }

    const deleteData = (index: number) => {
        const newData = tourPackageData.filter((_item, i) => index !== i);
        setTourPackageData([...newData])
    }

    const cancel = (index: number) => {
        const newData = tourPackageData.filter((_item, i) => index !== i);
        setTourPackageData([...newData])
        setActiveIndex(defaultActiveIndex)
    }

    const complete = () => {
        if (isActiveDataInValid()) {
            toast.warning("Please complete the active Package first")
            return;
        }
        setActiveIndex(defaultActiveIndex)
    }

    return (
        <div className="grid grid-cols-1 gap-3 p-5 card bg-base-200">
            <div className='flex gap-2 items-center'><QueueListIcon className='h-5 w-5' /> Tour Packages</div>
            {tourPackageData.map((e, i) => (
                <TourPackageCreateForm
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
            <button className="btn btn-primary" onClick={addAnother}>Add Tour Package</button>
        </div>
    )
})

export default TourPackageCreateCard