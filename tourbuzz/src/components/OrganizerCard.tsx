import { OrganizerType } from "@src/constants/types";
import TruncateText from "./TruncateText";
import { AtSymbolIcon, LinkIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Image from "./Image";

const OrganizerCard = ({ organizer }: { organizer: OrganizerType }) => {
    return (
        <div className="card card-side w-full h-full bg-base-200 p-3 group relative">
            <Link to={`/organizers/${organizer.id}`} className="btn btn-xs btn-primary opacity-0 group-hover:opacity-100 absolute top-0 right-0 m-3">Edit</Link>
            <div className="grid grid-cols-1 gap-3">
                <div className="flex">
                    <div className="h-[10rem] w-[10rem] relative flex-shrink-0">
                        <Image image={organizer.avatar} className="card h-[10rem] w-[10rem] object-cover" />
                        <div className="absolute bottom-0 right-0 m-2 badge badge-neutral">
                            {organizer.verification}
                        </div>
                    </div>
                    <div className="card-body py-0 pr-0 pl-5">
                        <div className="flex w-full items-center">
                            <div className="text-lg font-semibold">{organizer.name}</div>
                        </div>
                        <div className="flex flex-col space-y-1.5 text-sm">
                            <div className="flex gap-2 items-center">
                                <AtSymbolIcon className="h-4 w-4" />
                                {organizer.email}
                            </div>
                            <div className="flex gap-2 items-center">
                                <PhoneIcon className="h-4 w-4" />
                                {organizer.contact_no}
                            </div>
                            <Link to={organizer.social_link} target="_blank" className="flex gap-2 items-center">
                                <LinkIcon className="h-4 w-4" />
                                <TruncateText text={organizer.social_link} maxLength={20} />
                            </Link>
                            <div>
                                <TruncateText text={organizer.slogan} maxLength={100} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrganizerCard;