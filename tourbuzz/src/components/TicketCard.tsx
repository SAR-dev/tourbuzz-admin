import { TicketType } from "@src/types";

const TicketCard = ({ ticket }: { ticket: TicketType }) => {
    return (
        <div className="card card-side w-full h-full bg-base-200 p-3 group relative">
            {/* <Link to={`/hotels/${hotel.id}`} className="btn btn-xs h-8 w-8 btn-primary absolute z-[1] opacity-0 group-hover:opacity-100 top-0 right-0 m-3">
                <PencilIcon className="h-5 w-5" />
            </Link>
            <div className="grid grid-cols-1 gap-3">
                <div className="flex">
                    <div className="h-[7rem] w-[7rem] flex-shrink-0">
                        <Image image={hotel.avatar} className="card h-[7rem] w-[7rem] object-cover" />
                    </div>
                    <div className="card-body py-0 pr-0 pl-5">
                        <div className="flex w-full items-center">
                            <div className="text-lg font-semibold line-clamp-1">{hotel.name}</div>
                        </div>
                        <div className="flex flex-col space-y-1.5 text-sm">
                            <div className="flex gap-2 items-center">
                                <MapIcon className="h-5 w-5" />
                                <Link to={hotel.map_link} target="_blank" className="link">
                                    {getMapIdFromLink(hotel.map_link)}
                                </Link>
                            </div>
                            <div className="flex gap-2 items-center">
                                <LinkIcon className="h-5 w-5" />
                                <Link to={hotel.website} target="_blank" className="link">
                                    <TruncateText maxLength={30} text={hotel.website} />
                                </Link>
                            </div>
                            <div className="flex gap-2 items-center">
                                <Location className="h-5 w-5" />
                                {hotel.district.name}, {hotel.district.division.name}
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
}

export default TicketCard;