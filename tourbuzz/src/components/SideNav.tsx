import {
    PhotoIcon,
    PencilSquareIcon,
    BookOpenIcon,
    ChevronRightIcon,
    ChatBubbleBottomCenterIcon,
    HomeModernIcon,
    RectangleGroupIcon,
    XMarkIcon,
} from "@heroicons/react/24/solid";
import { ReactNode } from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import { Link, Navigate, useLocation } from "react-router-dom";
import EmojiPicker from "./EmojiPicker";
import { Map, Trees, Ad } from 'tabler-icons-react';
import classNames from "classnames";
import { useAuthStore, useNavStore } from "@src/store";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { Bars3Icon, UserCircleIcon } from "@heroicons/react/24/outline";
import { Tooltip as ReactTooltip } from 'react-tooltip'
import SignOutButton from "./SignOutButton";

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
    return (
        <div className="min-h-screen justify-center items-center flex p-10">
            <div className="card max-w-[30rem] w-full bg-neutral text-neutral-content">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">Error!</h2>
                    <p className="my-3">{error.message}</p>
                    <div className="card-actions justify-end">
                        <button className="btn" onClick={resetErrorBoundary}>Reset Error</button>
                        <button className="btn btn-primary" onClick={() => window.location.reload()}>Reload</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function SideNav({ children }: { children: ReactNode }) {
    const { open, toogleOpen } = useNavStore()
    const { isLoggedIn, getEmail } = useAuthStore()

    const location = useLocation();
    const { pathname } = location;

    const NavMenu = ({ name, url, icon, disabled, expanded }: { name: string, url: string, icon: ReactNode, disabled?: boolean, expanded: boolean }) => (
        <Link
            className={classNames({
                "btn btn-sm h-10 bg-transparent border-transparent shadow-none w-full flex justify-start": true,
                "cursor-not-allowed": disabled,
            })}
            to={disabled ? "#" : url}
            data-tooltip-id={"nav-tooltip"}
            data-tooltip-content={name}
            data-tooltip-hidden={expanded}
        >
            {icon}
            {expanded && (
                <>
                    {name}
                    <div className="ml-auto">
                        {((url == pathname || `${url}/create` == pathname)) && (
                            <ChevronRightIcon className='h-5 w-5' />
                        )}
                    </div>
                </>
            )}
        </Link>
    )

    if (!isLoggedIn()) {
        return <Navigate to="/" />
    }

    return (
        <div className="inline-flex w-full">
            <div className={classNames({
                "h-screen flex flex-col bg-base-200 overflow-y-auto overflow-x-hidden custom-scrollbar transition-all duration-300 ease-in-out": true,
                "w-[20rem]": open
            })}>
                <div>
                    <div className="h-12 flex items-center border-b border-base-300 w-full">
                        {open ? (
                            <div className="pl-3 pr-2 flex items-center justify-between w-full">
                                <Link to="/" className="font-semibold">
                                    TourBuzz
                                </Link>
                                <button className="btn btn-xs h-8 w-8 ml-auto bg-transparent border-transparent shadow-none" onClick={toogleOpen}>
                                    <XMarkIcon className="h-5 w-5" />
                                </button>
                            </div>
                        ) : (
                            <button className="btn btn-sm bg-transparent border-transparent shadow-none" onClick={toogleOpen}>
                                <Bars3Icon className="h-5 w-5" />
                            </button>
                        )}
                    </div>
                    <div className="flex flex-col space-y-1 mt-3">
                        <NavMenu expanded={open} name="Gallery" url="/images" icon={<PhotoIcon className="h-5 w-5" />} />
                        <NavMenu expanded={open} name="Writers" url="/writers" icon={<PencilSquareIcon className="h-5 w-5" />} />
                        <NavMenu expanded={open} name="Articles" url="/articles" icon={<BookOpenIcon className="h-5 w-5" />} />
                        <NavMenu expanded={open} name="Enqueries" url="/enqueries" icon={<ChatBubbleBottomCenterIcon className="h-5 w-5" />} />
                        <NavMenu expanded={open} name="Organizers" url="/organizers" icon={<RectangleGroupIcon className="h-5 w-5" />} />
                        <NavMenu expanded={open} name="Hotels" url="/hotels" icon={<HomeModernIcon className="h-5 w-5" />} />
                        <NavMenu expanded={open} name="Places" url="/places" icon={<Trees className="h-5 w-5" />} />
                        <NavMenu expanded={open} name="Tours" url="/tours" icon={<Map className="h-5 w-5" />} />
                        <NavMenu expanded={open} name="Advertisements" url="/ads" icon={<Ad className="h-5 w-5" />} />
                        <EmojiPicker expanded={open} />
                        <ThemeSwitcher expanded={open} />
                    </div>
                </div>
                <SignOutButton expanded={open} />
            </div>

            <div className="h-screen w-full overflow-y-auto p-5 relative">
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                    {children}
                </ErrorBoundary>
            </div>
            <ReactTooltip id="nav-tooltip" />
        </div>
    );
}