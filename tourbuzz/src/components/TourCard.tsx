import { ListTourType } from "@src/types";
import { CalendarDaysIcon, CheckBadgeIcon, MapPinIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Image from "./Image";
import { PencilIcon } from "@heroicons/react/16/solid";
import { timestampToYYYYMMDD } from "@src/functions/helpers";
import humanNumber from "human-number";

const TourCard = ({ tour }: { tour: ListTourType }) => {
    return (
        <div className="card card-side w-full h-full bg-base-200 p-3 group relative">
            <Link to={`/tours/${tour.id}`} className="btn btn-xs h-8 w-8 btn-primary absolute z-[1] opacity-0 group-hover:opacity-100 top-0 right-0 m-4">
                <PencilIcon className="h-5 w-5" />
            </Link>
            <div className="grid grid-cols-1">
                <div className="col-span-1 relative">
                    <div className="carousel w-full">
                        <div className="carousel-item w-full aspect-video">
                            <Image image={tour.avatar} className="card w-full aspect-video object-cover" />
                        </div>
                        {tour.images.map((e, i) => (
                            <div className="carousel-item w-full aspect-video" key={i}>
                                <Image image={e} className="card w-full aspect-video object-cover" />
                            </div>
                        ))}
                    </div>
                    <div className="badge badge-info absolute bottom-0 left-0 m-2">
                        From {humanNumber(Math.min.apply(Math, tour.package_prices_list))} TK
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="text-lg font-semibold my-2 line-clamp-2">{tour.title}</div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex gap-2 items-center">
                            <UserCircleIcon className="h-5 w-5" />
                            Organized By {tour.organizer_name}
                        </div>
                        <div className="flex gap-2 items-center">
                            <CheckBadgeIcon className="h-5 w-5" />
                            {tour.organizer_verification}
                        </div>
                        <div className="flex gap-2 items-center">
                            <MapPinIcon className="h-5 w-5" />
                            {tour.place_names_list.length} Places, {tour.district_names_list.length} Districts
                        </div>
                        <div className="flex gap-2 items-center">
                            <CalendarDaysIcon className="h-5 w-5" />
                            {timestampToYYYYMMDD(tour.start_at)} ~ {timestampToYYYYMMDD(tour.finish_at)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TourCard;