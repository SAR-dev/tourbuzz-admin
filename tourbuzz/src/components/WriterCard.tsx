import { WriterType } from "@src/constants/types";
import TruncateText from "./TruncateText";
import { AtSymbolIcon, CalendarIcon, LinkIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { timestampToYYYYMMDD } from "@src/functions/helpers";
import { Link } from "react-router-dom";

const WriterCard = ({ writer }: { writer: WriterType }) => {
    return (
        <div className="card card-side w-full h-full bg-base-200 p-3 group relative">
            <Link to={`/writers/${writer.id}`} className="btn btn-xs btn-primary opacity-0 group-hover:opacity-100 absolute top-0 right-0 m-3">Edit</Link>
            <div className="grid grid-cols-1 gap-3">
                <div className="flex">
                    <img className="card h-36 w-36" src={writer.avatar.thumbnail_url} alt="avatar" />
                    <div className="card-body py-0 pr-0 pl-5">
                        <h2 className="card-title">{writer.name}</h2>
                        <div className="flex flex-col space-y-1.5 text-sm">
                            <div className="flex gap-2 items-center">
                                <AtSymbolIcon className="h-4 w-4" />
                                {writer.email}
                            </div>
                            <div className="flex gap-2 items-center">
                                <PhoneIcon className="h-4 w-4" />
                                {writer.phone_no}
                            </div>
                            <Link to={writer.website} target="_blank" className="flex gap-2 items-center">
                                <LinkIcon className="h-4 w-4" />
                                <TruncateText text={writer.website} maxLength={20} />
                            </Link>
                            <div className="flex gap-2 items-center">
                                <CalendarIcon className="h-4 w-4" />
                                Joined {timestampToYYYYMMDD(writer.created_at)}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    &quot;<TruncateText text={writer.about} maxLength={200} />&quot;
                </div>
            </div>
        </div>
    );
}

export default WriterCard;