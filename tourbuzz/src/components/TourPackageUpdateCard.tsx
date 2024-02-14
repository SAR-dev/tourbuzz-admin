import { forwardRef, useImperativeHandle, useState } from 'react';
import { toast } from 'react-toastify';
import { WalletIcon } from '@heroicons/react/24/outline';
import TourPackageUpdateForm from './TourPackageUpdateForm';
import { deleteTourPackageById, postTourPackage } from '@src/functions/api';
import { parseErrorMessage } from '@src/types';
import TourPackageCreateForm from './TourPackageCreateForm';

export interface TourPackageUpdateState {
    id: number
    status: string;
    tours_id: number
    title: string;
    included: string
    excluded: string
    conditions: string
    price: number | null
    bkash_link: string
    nagad_link: string
}

export interface TourPackageCreateState {
    title: string;
    included: string
    excluded: string
    conditions: string
    price: number | null
    bkash_link: string
    nagad_link: string
}

const initialState: TourPackageCreateState = {
    title: "",
    included: "",
    excluded: "",
    conditions: "",
    price: null,
    bkash_link: "",
    nagad_link: ""
}

const defaultActiveIndex = -1;

export interface TourPackageUpdateRef {
    getData: () => TourPackageUpdateState[];
    updateData: (props: TourPackageUpdateState[]) => void;
}

const TourPackageUpdateCard = forwardRef<TourPackageUpdateRef, { tourId: number }>((props, ref) => {
    const [tourPackageData, setTourPackageData] = useState<TourPackageUpdateState[]>([])
    const [activeIndex, setActiveIndex] = useState(defaultActiveIndex)

    const [showEditor, setShowEditor] = useState(false)
    const [editorData, setEditorData] = useState<TourPackageCreateState>({ ...initialState })

    useImperativeHandle(ref, () => ({
        getData() {
            return tourPackageData;
        },
        updateData(props: TourPackageUpdateState[]) {
            setTourPackageData(props)
        }
    }))

    const isActiveDataInValid = () => {
        if (activeIndex == defaultActiveIndex) {
            return false;
        }
        if (tourPackageData[activeIndex].title.length < 3 ||
            tourPackageData[activeIndex].price == null ||
            tourPackageData[activeIndex].price == 0
        ) {
            return true;
        }
        return false;
    }

    const handleSetData = ({ data, index }: { data: TourPackageUpdateState, index: number }) => {
        const newData = [...tourPackageData];
        newData[index] = data;
        setTourPackageData(newData);
    };

    const handleSetEditorData = ({ data }: { data: TourPackageCreateState, index: number }) => {
        setEditorData({ ...data });
    };

    const editData = (index: number) => {
        if (showEditor || isActiveDataInValid()) {
            toast.warning("Please complete the active Package first")
            return;
        }
        setActiveIndex(index)
    }

    const deleteData = (index: number) => {
        const found = tourPackageData.find((_item, i) => index == i)
        if (!found) return;
        deleteTourPackageById({ id: found.id })
            .then(res => {
                if (res.error) {
                    toast.error("Tour package delete failed 🤦‍♂️")
                    toast.error(parseErrorMessage(res.error).message)
                } else {
                    toast.success("Tour package deleted 💪")
                    const newData = tourPackageData.filter((_item, i) => index !== i);
                    setTourPackageData([...newData])
                }
            })
    }

    const cancelEditor = () => {
        setShowEditor(false)
        setEditorData({ ...initialState })
    }

    const complete = () => {
        if (isActiveDataInValid()) {
            toast.warning("Please complete the active Package first")
            return;
        }
        setActiveIndex(defaultActiveIndex)
    }

    const completeEditor = () => {
        postTourPackage({
            tours_id: props.tourId,
            title: editorData.title,
            included: editorData.included,
            excluded: editorData.excluded,
            conditions: editorData.conditions,
            price: Number(editorData.price),
            bkash_link: editorData.bkash_link,
            nagad_link: editorData.nagad_link
        }).then(res => {
            if (res.error) {
                toast.error("Tour package create failed 🤦‍♂️")
                toast.error(parseErrorMessage(res.error).message)
            } else {
                toast.success("Tour package created 💪")
                const newData = [...tourPackageData];
                newData.push(res.data);
                setTourPackageData(newData);
                setEditorData({ ...initialState })
                setActiveIndex(defaultActiveIndex);
                setShowEditor(false)
            }
        })
    }

    const addAnother = () => {
        setActiveIndex(defaultActiveIndex)
        setShowEditor(true)
    }

    return (
        <div className="grid grid-cols-1 gap-3 p-5 card bg-base-200">
            <div className='flex gap-2 items-center'>
                <WalletIcon className='h-5 w-5' />
                Tour Packages
            </div>
            {tourPackageData.map((e, i) => (
                <TourPackageUpdateForm
                    data={e}
                    setData={handleSetData}
                    editData={editData}
                    deleteData={deleteData}
                    active={activeIndex == i}
                    complete={complete}
                    index={i}
                    key={i}
                />
            ))}
            {showEditor && (
                <TourPackageCreateForm
                    data={editorData}
                    setData={handleSetEditorData}
                    editData={(_: number) => (console.log())}
                    deleteData={cancelEditor}
                    active={true}
                    complete={completeEditor}
                    index={0}
                />
            )}
            <button className="btn btn-primary" onClick={addAnother}>
                Add Tour Package
            </button>
        </div>
    )
})

export default TourPackageUpdateCard