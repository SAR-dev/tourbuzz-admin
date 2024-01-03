import { DevicePhoneMobileIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { EnquiryType } from '@src/constants/types';
import { timestampToYYYYMMDD } from '@src/functions/helpers';
import { forwardRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { History, PhoneCall } from 'tabler-icons-react';
import Image from './Image';
import { toast } from 'react-toastify';
import { answerEnquery } from '@src/functions/api';
import { useQueryClient } from 'react-query';

interface EnquiryCardProps {
    enquiry: EnquiryType,
    disableHistory?: boolean
}

export const EnquiryCard = forwardRef<HTMLDivElement, EnquiryCardProps>(
    (
        {
            enquiry,
            disableHistory
        },
        ref
    ) => {
        const [answer, setAnswer] = useState("")
        const [loading, setLoading] = useState(false)
        const queryClient = useQueryClient()

        const submitAnswer = async () => {
            if (answer.length < 5) {
                toast.error("Answer is too short")
            };
            setLoading(true)
            answerEnquery({
                answer,
                enquiries_id: enquiry.id
            }).then(res => {
                if (res.error) {
                    toast.error("Reply failed 🤦‍♂️")
                    setLoading(false)
                } else {
                    toast.success("Reply sent 💪")
                    queryClient.invalidateQueries("enquiries")
                    setLoading(false)
                    setAnswer("")
                }

            })
        }
        return (
            <div className="grid grid-cols-2 divide-x divide-base-300" ref={ref}>
                <div className="p-5 flex flex-col space-y-3">
                    <div>
                        <div className='text-xs mb-1 flex w-full'>
                            <div className="flex items-center space-x-2">
                                <Image src={enquiry.user.avatar?.thumbnail_url} className='h-5 w-5 card' />
                                <div>{enquiry.user.email}</div>
                            </div>
                            <div className='ml-auto'>{timestampToYYYYMMDD(enquiry.created_at)}</div>
                        </div>
                        <div>{enquiry.question}</div>
                        <div className="text-xs mt-1 flex">
                            <DevicePhoneMobileIcon className='h-4 w-4 mr-1' />
                            {enquiry.contact_number ?? "No contact number"}
                        </div>
                    </div>
                </div>
                <div className="p-5">
                    {(enquiry.answer && enquiry.answer.length > 0) ? (
                        <div>
                            <div>{enquiry.answer}</div>
                            <div className="text-xs mt-1">
                                Replied On: {timestampToYYYYMMDD(enquiry.answered_at)}
                            </div>
                        </div>
                    ) : (
                        <div className="flex h-full flex-col w-full space-y-3">
                            <textarea
                                value={answer}
                                onChange={e => setAnswer(e.target.value)}
                                className="textarea textarea-bordered custom-scrollbar placeholder:text-base text-base w-full h-fill"
                            />
                            <div className="flex">
                                {!disableHistory && (
                                    <Link className="btn btn-xs mr-3" to={`/enqueries/${enquiry.user.id}`}>
                                        <History className='h-4 w-4' />
                                        History
                                    </Link>
                                )}
                                <a href={`tel:${enquiry.contact_number}`} className="btn btn-xs">
                                    <PhoneCall className='h-4 w-4' />
                                    Make a Call
                                </a>
                                <button className="btn btn-xs btn-info ml-auto" onClick={submitAnswer}>
                                    {loading ? (
                                        <>
                                            <span className="loading loading-spinner"></span>
                                            Sending
                                        </>
                                    ) : (
                                        <>
                                            <PaperAirplaneIcon className='h-5 w-5' />
                                            Send Reply
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
);

export default EnquiryCard