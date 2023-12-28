import { ChevronDownIcon, SwatchIcon } from '@heroicons/react/24/solid';
import { ThemeName, useThemeStore } from '@src/store';
import classNames from 'classnames';
import { useState } from 'react';

function ThemeSwitcher(): JSX.Element {
    const [show, setShow] = useState(false)
    const { theme, setTheme } = useThemeStore();

    return (
        <div>
            <button className="btn btn-sm h-10 bg-transparent border-transparent shadow-none w-full flex justify-start" onClick={() => setShow(c => !c)}>
                <SwatchIcon className='h-5 w-5' />
                Theme
                {show && (
                    <ChevronDownIcon className='h-5 w-5 ml-auto' />
                )}
            </button>
            <div className={classNames({
                "px-3": true,
                "hidden": !show
            })}>
                {Object.keys(ThemeName).map((key) => (
                    <div className="form-control" key={key}>
                        <label className="label cursor-pointer gap-4">
                            <span className="label-text">{key}</span>
                            <input type="radio" name="theme-radios" className="radio theme-controller" value={ThemeName[key as keyof typeof ThemeName]} checked={theme === ThemeName[key as keyof typeof ThemeName]} onChange={e => setTheme(e.target.value as ThemeName)} />
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ThemeSwitcher;
