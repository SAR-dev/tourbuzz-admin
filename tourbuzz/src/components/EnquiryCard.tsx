import { DevicePhoneMobileIcon } from '@heroicons/react/24/outline';
import { EnquiryType } from '@src/constants/types';
import { timestampToYYYYMMDD } from '@src/functions/helpers';
import { useState } from 'react';
import { History, PhoneCall } from 'tabler-icons-react';

const EnquiryCard = ({ enquiry }: { enquiry: EnquiryType }) => {
    const [answer, setAnswer] = useState("")
    return (
        <div className="grid grid-cols-2 divide-x divide-base-300">
            <div className="p-5 flex flex-col space-y-3">
                <div>
                    <div className='text-xs mb-1 flex w-full'>
                        <div>{enquiry.user.email}</div>
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
                            <button className="btn btn-xs">
                                <History className='h-4 w-4' />
                                History
                            </button>
                            <button className="btn btn-xs ml-3">
                                <PhoneCall className='h-4 w-4' />
                                Make a Call
                            </button>
                            <button className="btn btn-xs btn-info ml-auto">Send Reply</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default EnquiryCard