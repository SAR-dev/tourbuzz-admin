import { PhotoIcon, PencilSquareIcon, BookOpenIcon, ChevronRightIcon, ChatBubbleBottomCenterIcon, HomeModernIcon, RectangleGroupIcon } from "@heroicons/react/24/solid";
import { ReactNode } from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import { Link, useLocation, useNavigate } from "react-router-dom";
import EmojiPicker from "./EmojiPicker";
import { Map, Trees } from "tabler-icons-react";

export function SideNav({ children }: { children: ReactNode }) {
    const navigate = useNavigate();
    const location = useLocation();

    const { pathname } = location;

    const NavMenu = ({ name, url, icon }: { name: string, url: string, icon: ReactNode }) => (
        <button className="btn btn-sm h-10 bg-transparent border-transparent shadow-none w-full flex justify-start" onClick={() => navigate(url)}>
            {icon} {name}
            {url == pathname && (
                <ChevronRightIcon className='h-5 w-5 ml-auto' />
            )}
        </button>
    )

    return (
        <div className="inline-flex w-full">
            <div className="h-screen w-[20rem] p-2 bg-base-200 overflow-y-auto custom-scrollbar">
                <div className="h-12 flex items-center border-b border-base-300 pl-3">
                    <Link to="/" className="font-semibold text-xl">
                        TourBuzz
                    </Link>
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
            <div className="h-screen w-full overflow-y-auto p-5">
                {children}
            </div>
        </div>
    );
}