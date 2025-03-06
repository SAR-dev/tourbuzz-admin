import { WriterType } from "@src/types";
import TruncateText from "./TruncateText";
import { AtSymbolIcon, LinkIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Image from "./Image";
import { PencilIcon } from "@heroicons/react/16/solid";

const WriterCard = ({ writer }: { writer: WriterType }) => {
    return (
        <div className="card card-side w-full h-full bg-base-200 p-3 group relative">
            <Link to={`/writers/${writer.id}`} className="btn btn-xs h-8 w-8 btn-primary absolute z-[1] opacity-0 group-hover:opacity-100 top-0 right-0 m-3">
                <PencilIcon className="h-5 w-5" />
            </Link>
            <div className="grid grid-cols-1 gap-3">
                <div className="flex">
                    <Image image={writer.avatar} className="card h-[7rem] w-[7rem] object-cover" />
                    <div className="card-body py-0 pr-0 pl-5">
                        <div className="text-lg font-semibold">{writer.name}</div>
                        <div className="flex flex-col space-y-1.5 text-sm">
                            <div className="flex gap-2 items-center">
                                <AtSymbolIcon className="h-4 w-4" />
                                {writer.email}
                            </div>
                            <div className="flex gap-2 items-center">
                                <PhoneIcon className="h-4 w-4" />
                                {writer.contact_no}
                            </div>
                            <Link to={writer.website} target="_blank" className="flex gap-2 items-center">
                                <LinkIcon className="h-4 w-4" />
                                <TruncateText text={writer.website} maxLength={20} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WriterCard;