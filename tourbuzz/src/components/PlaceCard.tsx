import { PlaceType } from "@src/constants/types";
import { Link } from "react-router-dom";
import Image from "./Image";
import TruncateText from "./TruncateText";

const PlaceCard = ({ place }: { place: PlaceType }) => {
    return (
        <div className="card card-side w-full h-full bg-base-200 p-3 group relative">
            <Link to={`/places/${place.id}`} className="btn btn-xs btn-primary opacity-0 group-hover:opacity-100 absolute top-0 right-0 m-3">Edit</Link>
            <div className="grid grid-cols-1 gap-3">
                <div className="flex">
                    <Image image={place.avatar} className="card h-[7rem] w-[7rem] object-cover" />
                    <div className="card-body py-0 pr-0 pl-5">
                        <div className="text-lg font-semibold">{place.name}</div>
                        <div className="flex flex-col space-y-1.5 text-sm">
                            <div>{place.district.name}, {place.district.division.name}</div>
                            <div>{place.postal_code}</div>
                            <div>
                                <Link to={place.map_link} target="_blank" className="link">
                                    <TruncateText maxLength={30} text={place.map_link} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlaceCard;