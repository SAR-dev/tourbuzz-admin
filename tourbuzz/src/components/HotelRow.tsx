import { HotelType } from "@src/types";
import { convertToNDigit } from "@src/functions/helpers";
import { Link } from "react-router-dom";
import TruncateText from "./TruncateText";
import Image from "./Image";

const HotelRow = ({ hotel }: { hotel: HotelType }) => {
    return (
        <tr>
            <th>{convertToNDigit(hotel.id, 4)}</th>
            <td className="w-32">
                <Image image={hotel.avatar} className="h-20 w-20 card object-cover" />
            </td>
            <td className="w-64">{hotel.name}</td>
            <td>
                <Link to={hotel.map_link} target="_blank" className="link">
                    <TruncateText maxLength={30} text={hotel.map_link} />
                </Link>
            </td>
            <td>
                {hotel.website ? (
                    <Link to={hotel.website} target="_blank" className="link">
                        <TruncateText maxLength={30} text={hotel.website} />
                    </Link>
                ) : (
                    "No website adeed"
                )}
            </td>
            <td>{hotel.district.name}, {hotel.district.division.name}</td>
            <td>
                <div className="line-clamp-3">
                    {hotel.review}
                </div>
            </td>
            <td>
                <Link className="btn btn-sm btn-outline" to={`/hotels/${hotel.id}`}>Edit</Link>
            </td>
        </tr>
    )
}

export default HotelRow;