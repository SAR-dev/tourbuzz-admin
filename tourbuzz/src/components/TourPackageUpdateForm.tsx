import { BanknotesIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import classNames from 'classnames';
import MarkdownEditor from './MarkdownEditor';
import { TourPackageUpdateState } from './TourPackageUpdateCard';
import humanNumber from "human-number";
import DeleteButton from "./DeleteButton";


const TourPackageUpdateForm = ({
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
    data: TourPackageUpdateState,
    setData: ({ data, index }: { data: TourPackageUpdateState, index: number }) => void,
    editData: (index: number) => void,
    deleteData: (index: number) => void,
    complete: () => void
}) => {
    const setIncluded = (value: string) => {
        setData({ data: { ...data, included: value }, index })
    }

    const setExcluded = (value: string) => {
        setData({ data: { ...data, excluded: value }, index })
    }

    const setConditions = (value: string) => {
        setData({ data: { ...data, conditions: value }, index })
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
                        <div className="grid grid-cols-1 gap-3 mb-3">
                            <div>
                                <label className="label">Package Title</label>
                                <input value={data.title} onChange={e => setData({ data: { ...data, title: e.target.value }, index })} type="text" placeholder="Title" className="input input-bordered w-full" />
                            </div>
                            <div>
                                <label className="label">Package Price</label>
                                <input value={data.price?.toString()} onChange={e => setData({ data: { ...data, price: Number(e.target.value) }, index })} type="number" placeholder="Price" className="input input-bordered w-full" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="label">Package Title</label>
                        <input value={data.title} onChange={e => setData({ data: { ...data, title: e.target.value }, index })} type="text" placeholder="Title" className="input input-bordered w-full" />
                    </div>
                    <div>
                        <label className="label">Package Price</label>
                        <input value={data.price?.toString()} onChange={e => setData({ data: { ...data, price: Number(e.target.value) }, index })} type="number" placeholder="Price" className="input input-bordered w-full" />
                    </div>
                    <div className="flex flex-col">
                        <label className="label">Included Services</label>
                        <MarkdownEditor
                            value={data.included}
                            setValue={setIncluded}
                            placeholder="Write using bullet points"
                            minimal
                            height='20rem'
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="label">Excluded Services</label>
                        <MarkdownEditor
                            value={data.excluded}
                            setValue={setExcluded}
                            placeholder="Write using bullet points"
                            minimal
                            height='20rem'
                        />
                    </div>
                    <div className='col-span-2'>
                        <div className="flex flex-col">
                            <label className="label">Terms & Conditions</label>
                            <MarkdownEditor
                                value={data.conditions}
                                setValue={setConditions}
                                placeholder="Start writing details in Markdown"
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className='w-full flex items-center'>
                    <BanknotesIcon className='h-5 w-5' />
                    <div className="font-semibold ml-2 mr-4">{data.price ? `[${humanNumber(data.price)} TK]` : data.price}</div>
                    <div>{data.title}</div>
                    <div className="ml-auto flex gap-2">
                        <div className={classNames({
                            "warning-badge": data.status.toLowerCase() == "draft",
                            "success-badge": data.status.toLowerCase() == "published",
                        })}>{data.status}</div>
                        <button className="btn btn-sm" onClick={() => editData(index)}>Edit</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TourPackageUpdateForm