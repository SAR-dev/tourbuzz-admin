import { ChevronDownIcon, SwatchIcon } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';

const themes = [
    { name: "Black", value: "black" },
    { name: "Dark", value: "dark" },
    { name: "Retro", value: "retro" },
    { name: "Cyberpunk", value: "cyberpunk" },
    { name: "Valentine", value: "valentine" },
    { name: "Aqua", value: "aqua" },
    { name: "Light", value: "light" },
]

function ThemeSwitcher(): JSX.Element {
    const [show, setShow] = useState(false)
    const [theme, setTheme] = useState<string>('black');

    const toggleTheme = (color: string): void => {
        setTheme(color);
    };

    useEffect(() => {
        document.querySelector('html')?.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <div>
            <button className="btn btn-sm h-10 bg-transparent border-transparent shadow-none w-full flex justify-start" onClick={() => setShow(c => !c)}>
                <SwatchIcon className='h-5 w-5' />
                Theme
                {show && (
                    <ChevronDownIcon className='h-5 w-5 ml-auto' />
                )}
            </button>
            {show && (
                <div className='px-3'>
                    {themes.map((e, i) => (
                        <div className="form-control" key={i}>
                            <label className="label cursor-pointer gap-4">
                                <span className="label-text">{e.name}</span>
                                <input type="radio" name="theme-radios" className="radio theme-controller" value={e.value} checked={theme === e.value} onChange={e => toggleTheme(e.target.value)} />
                            </label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ThemeSwitcher;
