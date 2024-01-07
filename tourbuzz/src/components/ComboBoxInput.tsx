import { Fragment, useState } from 'react';
import { Combobox } from '@headlessui/react';
import { Float } from '@headlessui-float/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';

export interface ComboboxDataType {
    value: string
    text: string
    extraText?: string
}

const ComboBoxInput = ({
    values,
    selectedValue,
    setSelectedValue,
    handleNewValue
}: {
    values: ComboboxDataType[],
    selectedValue: ComboboxDataType | null,
    setSelectedValue: (props: ComboboxDataType) => void,
    handleNewValue: (props: string) => void
}) => {
    //   const [selectedValue, setSelectedValue] = useState<ComboboxDataType>(null);
    const [query, setQuery] = useState('');
    const [hide, setHide] = useState(false)

    const filteredData =
        query === ''
            ? values
            : values.filter((value) =>
                value.text
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            );

    const handleAddOption = () => {
        handleNewValue(query)
        setHide(true)
    }

    const handleHide = () => {
        setQuery('')
    }

    const handleQuery = (text: string) => {
        setQuery(text)
        setHide(false)
    }

    return (
        <div>
            <Combobox value={selectedValue} onChange={setSelectedValue}>
                <Float
                    as="div"
                    className="relative w-64"
                    placement="bottom-start"
                    offset={4}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    floatingAs={Fragment}
                    onHide={handleHide}
                >
                    <div className="relative w-full text-left">
                        <Combobox.Input
                            className="input input-bordered w-full"
                            displayValue={(e: ComboboxDataType) => e?.text}
                            onChange={(event) => handleQuery(event.target.value)}
                        />

                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                                className="w-5 h-5 text-base-300"
                                aria-hidden="true"
                            />
                        </Combobox.Button>
                    </div>

                    <Combobox.Options className={classNames({
                        "absolute w-full py-1 overflow-y-auto custom-scrollbar shadow-lg max-h-60 card bg-base-100 border border-base-300": true,
                        "hidden": hide
                    })}>
                        {filteredData.length === 0 && query !== '' ? (
                            <div className="relative py-2 pl-10 pr-4 text-base-content cursor-default select-none">
                                No result found
                            </div>
                        ) : (
                            filteredData.map((d) => (
                                <Combobox.Option
                                    key={d.value}
                                    className={({ active }) =>
                                        `relative py-2 pl-10 pr-4 cursor-default select-none ${active
                                            ? 'bg-accent text-accent-content'
                                            : 'text-base-content'
                                        }`
                                    }
                                    value={d}
                                >
                                    {({ selected, active }) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                            >
                                                {d.text} {d.extraText}
                                            </span>
                                            {selected && (
                                                <span
                                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-neutral-content' : 'text-accent'
                                                        }`}
                                                >
                                                    <CheckIcon
                                                        className="w-5 h-5"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            )}
                                        </>
                                    )}
                                </Combobox.Option>
                            ))
                        )}
                        <div className="relative py-2 pl-10 pr-4 text-base-content cursor-pointer hover:bg-info hover:text-info-content select-none" onClick={handleAddOption}>
                            Create New Item
                        </div>
                    </Combobox.Options>
                </Float>
            </Combobox>
        </div>
    );
}

export default ComboBoxInput;