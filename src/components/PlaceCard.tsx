import { PlaceType } from "@src/types";
import { Link } from "react-router-dom";
import Image from "./Image";
import { PencilIcon } from "@heroicons/react/24/solid";

const PlaceCard = ({ place }: { place: PlaceType }) => {
    return (
        <div className="card card-side w-full h-full bg-base-200 p-3 group relative">
            <Link to={`/places/${place.id}`} className="btn btn-xs h-8 w-8 btn-primary absolute z-[1] opacity-0 group-hover:opacity-100 top-0 right-0 m-4">
                <PencilIcon className="h-5 w-5" />
            </Link>
            <div className="grid grid-cols-1 gap-3 w-full">
                    <div className="h-64 relative">
                        <Image image={place.avatar} className="card h-64 w-full object-cover" />
                        <div className="badge absolute bottom-0 left-0 m-2">
                            {place.type}
                        </div>
                    </div>
                    <div className="card-body p-0">
                        <div className="text-lg font-semibold line-clamp-1">{place.name}</div>
                        <div className="flex flex-col space-y-1.5 text-sm">
                            <div>{place.district.name}, {place.district.division.name}</div>
                            <div>{place.postal_code}</div>
                            <div className="truncate">
                                <Link to={place.map_link} target="_blank" className="link">
                                    {place.map_link}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default PlaceCard;