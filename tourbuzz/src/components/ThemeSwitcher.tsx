import { SwatchIcon } from '@heroicons/react/24/solid';
import { ThemeName, useThemeStore } from '@src/store';
import { useState } from 'react';
import Modal from './Modal';

function ThemeSwitcher({ expanded }: { expanded: boolean }): JSX.Element {
    const [show, setShow] = useState(false)
    const toogleShow = () => setShow(!show);
    const { theme, setTheme } = useThemeStore();

    return (
        <div>
            <button
                className="btn btn-sm h-10 bg-transparent border-transparent shadow-none w-full flex justify-start"
                onClick={toogleShow}
                data-tooltip-id="nav-tooltip"
                data-tooltip-content="Theme Picker"
            >
                <SwatchIcon className='h-5 w-5' />
                {expanded && (
                    <>
                        Theme
                    </>
                )}
            </button>
            <Modal open={show} handleClose={toogleShow} title='Pick Theme' width='70rem' closeButton>
                <div className="grid grid-cols-4 gap-5 p-5 overflow-y-auto custom-scrollbar h-[30rem]">
                    {Object.keys(ThemeName).map((key, i) => (
                        <div className="flex gap-2 w-full" key={i}>
                            <input type="radio" name="theme-radios" className="radio theme-controller" value={ThemeName[key as keyof typeof ThemeName]} checked={theme === ThemeName[key as keyof typeof ThemeName]} onChange={e => setTheme(e.target.value as ThemeName)} />
                            <div
                                data-theme={ThemeName[key as keyof typeof ThemeName]}
                                className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
                                onClick={() => setTheme(ThemeName[key as keyof typeof ThemeName])}
                            >
                                <div className="grid grid-cols-5 grid-rows-3">
                                    <div className="bg-base-200 col-start-1 row-span-2 row-start-1" />
                                    <div className="bg-base-300 col-start-1 row-start-3" />
                                    <div className="bg-base-100 col-span-4 col-start-2 row-span-3 row-start-1 flex flex-col gap-1 p-2">
                                        <div className="font-bold">{key}</div>
                                        <div className="flex flex-wrap gap-1">
                                            <div className="bg-primary flex aspect-square items-center justify-center rounded w-6">
                                                <div className="text-primary-content text-sm font-bold">A</div>
                                            </div>
                                            <div className="bg-secondary flex aspect-square items-center justify-center rounded w-6">
                                                <div className="text-secondary-content text-sm font-bold">A</div>
                                            </div>
                                            <div className="bg-accent flex aspect-square items-center justify-center rounded w-6">
                                                <div className="text-accent-content text-sm font-bold">A</div>
                                            </div>
                                            <div className="bg-neutral flex aspect-square items-center justify-center rounded w-6">
                                                <div className="text-neutral-content text-sm font-bold">A</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        // <div className="form-control" key={key}>
                        //     <div className="flex items-center cursor-pointer gap-4">
                        //         <input type="radio" name="theme-radios" className="radio theme-controller" value={ThemeName[key as keyof typeof ThemeName]} checked={theme === ThemeName[key as keyof typeof ThemeName]} onChange={e => setTheme(e.target.value as ThemeName)} />
                        //         <span className="label-text">{key}</span>
                        //     </div>
                        // </div>
                    ))}
                </div>
            </Modal>
        </div>
    );
}

export default ThemeSwitcher;
