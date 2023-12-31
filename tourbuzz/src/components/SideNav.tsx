import { PhotoIcon, PencilSquareIcon, BookOpenIcon, ChevronRightIcon, ChatBubbleBottomCenterIcon, HomeModernIcon, RectangleGroupIcon, XMarkIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import { ReactNode, useState } from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import { Link, useLocation, useNavigate } from "react-router-dom";
import EmojiPicker from "./EmojiPicker";
import { Map, Trees } from "tabler-icons-react";
import classNames from "classnames";

export function SideNav({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false)

    const location = useLocation();
    const { pathname } = location;

    const NavMenu = ({ name, url, icon }: { name: string, url: string, icon: ReactNode }) => (
        <Link className="btn btn-sm h-10 bg-transparent border-transparent shadow-none w-full flex justify-start" to={url}>
            {icon} {name}
            {url == pathname && (
                <ChevronRightIcon className='h-5 w-5 ml-auto' />
            )}
        </Link>
    )

    return (
        <div className="inline-flex w-full">
            <div className={classNames({
                "h-screen w-[20rem] p-2 bg-base-200 overflow-y-auto custom-scrollbar": true,
                "hidden": !open,
                "block": open
            })}>
                <div className="h-12 flex items-center border-b border-base-300 pl-3 pr-2 w-full">
                    <Link to="/" className="font-semibold text-xl">
                        TourBuzz
                    </Link>
                    <button className="btn btn-xs h-8 w-8 ml-auto" onClick={() => setOpen(!open)}>
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                </div>
                <div className="flex flex-col space-y-1 mt-3">
                    <NavMenu name="Gallery" url="/images" icon={<PhotoIcon className="h-5 w-5" />} />
                    <NavMenu name="Writers" url="/writers" icon={<PencilSquareIcon className="h-5 w-5" />} />
                    <NavMenu name="Articles" url="/articles" icon={<BookOpenIcon className="h-5 w-5" />} />
                    <NavMenu name="Enqueries" url="/enqueries" icon={<ChatBubbleBottomCenterIcon className="h-5 w-5" />} />
                    <NavMenu name="Hotels" url="/hotels" icon={<HomeModernIcon className="h-5 w-5" />} />
                    <NavMenu name="Organizers" url="/organizers" icon={<RectangleGroupIcon className="h-5 w-5" />} />
                    <NavMenu name="Places" url="/places" icon={<Trees className="h-5 w-5" />} />
                    <NavMenu name="Tours" url="/tours" icon={<Map className="h-5 w-5" />} />
                    <EmojiPicker />
                    <ThemeSwitcher />
                </div>
            </div>
            <div className="h-screen w-full overflow-y-auto p-5 relative">
                {!open && (
                    <button className="btn btn-xs btn-primary z-50 rounded-l-none h-8 w-8 fixed top-0 left-0 mt-5" onClick={() => setOpen(true)}>
                        <ChevronDoubleRightIcon className="h-5 w-5" />
                    </button>
                )}
                {children}
            </div>
        </div>
    );
}