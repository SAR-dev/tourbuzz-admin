import { Card, Typography, List, ListItem, ListItemPrefix, ListItemSuffix, Chip } from "@material-tailwind/react";
import { UserCircleIcon, Cog6ToothIcon, InboxIcon, PowerIcon, PhotoIcon, ChevronRightIcon, PencilSquareIcon, BookOpenIcon } from "@heroicons/react/24/solid";
import { PageName, usePageStore } from "@src/store";
import classNames from "classnames";
import { ReactNode } from "react";

export function SideNav() {
    const { page, setPage } = usePageStore();

    const NavMenu = ({ name, icon }: { name: PageName, icon: ReactNode }) => (
        <ListItem onClick={() => setPage(name)} className={classNames({
            "bg-gray-300/50 hover:bg-gray-300/25": page === name
        })}>
            <ListItemPrefix>
                {icon}
            </ListItemPrefix>
            {name}
            {page === name && (
                <ListItemSuffix>
                        <ChevronRightIcon className="h-5 w-5" />
                </ListItemSuffix>
            )}
        </ListItem>
    )

    return (
        <Card className="h-screen w-full max-w-[20rem] p-2 shadow-xl shadow-blue-gray-900/5">
            <div className="mb-2 flex items-center gap-4 p-4">
                <img src="https://docs.material-tailwind.com/img/logo-ct-dark.png" alt="brand" className="h-8 w-8" />
                <Typography variant="h5" color="blue-gray">
                    TourBuzz
                </Typography>
            </div>
            <List>
                <NavMenu name={PageName.Gallery} icon={<PhotoIcon className="h-5 w-5" />} />
                <NavMenu name={PageName.Writers} icon={<PencilSquareIcon className="h-5 w-5" />} />
                <NavMenu name={PageName.Articles} icon={<BookOpenIcon className="h-5 w-5" />} />
                <NavMenu name={PageName.WriteArticle} icon={<BookOpenIcon className="h-5 w-5" />} />
                
                <hr className="my-2 border-blue-gray-50" />
        
                <ListItem>
                    <ListItemPrefix>
                        <Cog6ToothIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Settings
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                        <PowerIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Log Out
                </ListItem>
            </List>
        </Card>
    );
}