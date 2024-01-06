import { PlaceType } from "@src/constants/types";
import { Link } from "react-router-dom";
import Image from "./Image";

const PlaceCard = ({ place }: { place: PlaceType }) => {
    return (
        <div className="card card-side w-full h-full bg-base-200 p-3 group relative">
            <Link to={`/places/${place.id}`} className="btn btn-xs btn-primary opacity-0 group-hover:opacity-100 absolute top-0 right-0 m-3">Edit</Link>
            <div className="grid grid-cols-1 gap-3">
                <div className="h-[7rem] w-[7rem] flex">
                    <Image image={place.avatar} className="card h-[7rem] w-[7rem] object-cover" />
                    <div className="card-body py-0 pr-0 pl-5">
                        <div className="text-lg font-semibold">{place.name}</div>
                        <div className="flex flex-col space-y-1.5 text-sm">
                            {/* <div className="flex gap-2 items-center">
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
                            </Link> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlaceCard;