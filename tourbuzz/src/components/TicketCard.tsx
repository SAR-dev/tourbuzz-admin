import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { TicketType } from "@src/types";

const TicketCard = ({ ticket }: { ticket: TicketType }) => {
    return (
        <div className="card w-full h-full bg-base-200 group relative">
            <div className="p-3 w-full border-b border-base-300 font-medium">{ticket.booked_package.tour.title}</div>
            <div className="flex w-full divide-x divide-base-300">
                <div className="flex space-x-3 items-center w-64 p-5 flex-shrink-0">
                    <div className="h-12 w-12">
                        <img src={ticket.payment.user.avatar?.thumbnail_url} className="h-12 w-12 rounded-full object-cover" alt="" />
                    </div>
                    <div>
                        <div className="font-medium">{ticket.payment.user.name}</div>
                        <div className="text-xs">INV {ticket.payment.invoice_no}</div>
                        <div className="text-xs">{ticket.booked_package.tour_package.title} | {ticket.ticket_amount} Tickets</div>
                    </div>
                </div>
                <div className="p-2 w-20 flex items-center">
                    <button className="btn">
                        <ArrowRightIcon className="h-5 w-5" />
                    </button>
                </div>
                <div className="grid grid-cols-3 gap-5 p-2 w-full">
                    {ticket.files.map((file, i) => (
                        <div className="bg-base-100 card p-3 w-full" key={i}>
                            <div className="text-sm text-info font-medium">{file.filename}</div>
                            <a href={file.link} target="_blank" className="text-xs text-ellipsis">{file.link}</a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TicketCard;