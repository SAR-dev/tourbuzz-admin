import { AdType } from "@src/types";
import { Link } from "react-router-dom";
import Image from "./Image";
import { PencilIcon } from "@heroicons/react/16/solid";
import { getImageTypeFromUrl } from "@src/functions/helpers";

const AdCard = ({ ad }: { ad: AdType }) => {
    return (
        <div className="card card-side w-full h-full bg-base-200 p-3 group relative">
            <Link to={`/ads/${ad.id}`} className="btn btn-xs h-8 w-8 btn-primary absolute z-[1] opacity-0 group-hover:opacity-100 top-0 right-0 m-4">
                <PencilIcon className="h-5 w-5" />
            </Link>
            <div className="flex flex-col space-y-2">
                <div className="w-full h-64">
                    <Image image={getImageTypeFromUrl(ad.image_url)} className="card w-full h-64 object-cover" />
                </div>
                <div className="w-full flex flex-col space-y-2">
                    <div className="text-lg font-semibold">{ad.title}</div>
                    <div className="text-sm">{ad.subtitle}</div>
                </div>
            </div>
        </div>
    );
}

export default AdCard;