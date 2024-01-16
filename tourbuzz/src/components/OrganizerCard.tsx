import { OrganizerType } from "@src/types";
import { AtSymbolIcon, CheckBadgeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Image from "./Image";
import { PencilIcon } from "@heroicons/react/16/solid";
import { Badge, DeviceMobileRotated, IdBadge, IdBadge2, Mail } from "tabler-icons-react";

const OrganizerCard = ({ organizer }: { organizer: OrganizerType }) => {
    return (
        <div className="card card-side w-full h-full bg-base-200 p-3 group relative">
            <Link to={`/organizers/${organizer.id}`} className="btn btn-xs h-8 w-8 btn-primary absolute z-[1] opacity-0 group-hover:opacity-100 top-0 right-0 m-3">
                <PencilIcon className="h-5 w-5" />
            </Link>
            <div className="grid grid-cols-1 gap-3">
                <div className="flex">
                    <div className="h-[7rem] w-[7rem] flex-shrink-0">
                        <Image image={organizer.avatar} className="card h-[7rem] w-[7rem] object-cover" />
                    </div>
                    <div className="card-body py-0 pr-0 pl-5">
                        <div className="flex w-full items-center">
                            <div className="text-lg font-semibold">{organizer.name}</div>
                        </div>
                        <div className="flex flex-col space-y-1.5 text-sm">
                            <div className="flex gap-2 items-center">
                                <Mail className="h-5 w-5" />
                                {organizer.email}
                            </div>
                            <div className="flex gap-2 items-center">
                                <DeviceMobileRotated className="h-5 w-5" />
                                {organizer.contact_no}
                            </div>
                            <div className="flex gap-2 items-center">
                                <IdBadge2 className="h-5 w-5" />
                                {organizer.verification}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="line-clamp-5 text-sm ">
                    {organizer.slogan}
                    <br /><br />
                    {organizer.description}
                </div>
            </div>
        </div>
    );
}

export default OrganizerCard;