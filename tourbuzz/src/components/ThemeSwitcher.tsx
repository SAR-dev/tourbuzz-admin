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
            <Modal open={show} handleClose={toogleShow} title='Pick Theme' width='50rem' closeButton>
                <div className="grid grid-cols-4 gap-5">
                    {Object.keys(ThemeName).map((key) => (
                        <div className="form-control" key={key}>
                            <div className="flex items-center cursor-pointer gap-4">
                                <input type="radio" name="theme-radios" className="radio theme-controller" value={ThemeName[key as keyof typeof ThemeName]} checked={theme === ThemeName[key as keyof typeof ThemeName]} onChange={e => setTheme(e.target.value as ThemeName)} />
                                <span className="label-text">{key}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </Modal>
        </div>
    );
}

export default ThemeSwitcher;
