import { ArrowUpIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { EnquiryListType, EnquiryType } from '@src/types';
import { findMaxContinuous, timestampToYYYYMMDD, timestampToYYYYMMDDHHMMSS } from '@src/functions/helpers';
import { forwardRef, useMemo, useState } from 'react';
import Image from './Image';
import { toast } from 'react-toastify';
import { answerEnquery } from '@src/functions/api';
import { useQueryClient } from 'react-query';
import ReactTextareaAutosize from 'react-textarea-autosize';
import classNames from 'classnames';

interface EnquiryCardProps {
    enquiry: EnquiryListType,
    disableHistory?: boolean
}

const AnswerRenderer = ({ enquiry }: { enquiry: EnquiryType }) => {
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
        <>
            {(enquiry.answer && enquiry.answer.length > 0) ? (
                <div>
                    <div>✉️ {enquiry.answer}</div>
                    <div className='flex text-sm gap-1 mt-1'>
                        <ArrowUpIcon className='h-4 w-4' /> {timestampToYYYYMMDDHHMMSS(enquiry.answered_at)}
                    </div>
                </div>
            ) : (
                <div className="flex h-full flex-col w-full space-y-3">
                    <ReactTextareaAutosize
                        value={answer}
                        onChange={e => setAnswer(e.target.value)}
                        className="textarea textarea-bordered custom-scrollbar placeholder:text-base text-base w-full"
                    />
                    <div className="flex">
                        <button className="btn btn-sm btn-info ml-auto" onClick={submitAnswer}>
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
        </>
    )
}

export const EnquiryCard = forwardRef<HTMLDivElement, EnquiryCardProps>(
    (
        { enquiry },
        ref
    ) => {
        const [show, setShow] = useState(false)
        const maxIndex = useMemo(() => {
            return findMaxContinuous(
                enquiry.enquiries
                    .filter(e => e.answer != null && e.answer.length > 0)
                    .map((_e, i) => i)
            );
        }, [enquiry.enquiries]);

        return (
            <div className="grid grid-cols-4 divide-x divide-base-300" ref={ref}>
                <div className="p-5 flex flex-col space-y-3">
                    <div className='text-sm flex flex-col space-y-3'>
                        <div className='flex w-full'>
                            <div className="flex items-center space-x-3">
                                <Image image={enquiry.user.avatar} className='h-16 w-16 card' />
                                <div className='flex flex-col space-y-1'>
                                    <div>
                                        {enquiry.user.name ?? "No name set yet"}
                                    </div>
                                    <div>{enquiry.user.email}</div>
                                    <div>Joined {timestampToYYYYMMDD(enquiry.user.created_at)}</div>
                                </div>
                            </div>
                        </div>
                        <div>{enquiry.enquiries.length} questions asked</div>
                    </div>
                </div>
                <div className="col-span-3">
                    {!show && maxIndex > 0 && (
                        <div className="text-info p-3 text-sm cursor-pointer hover:underline" onClick={() => setShow(true)}>
                            Show {maxIndex} previous questions
                        </div>
                    )}
                    <div className="grid grid-cols-1 divide-y divide-base-300 w-full">
                        {enquiry.enquiries.map((e, i) => (
                            <div className={classNames({
                                "grid-cols-2 divide-x divide-base-300 w-full": true,
                                "hidden": i < maxIndex && !show,
                                "grid": i >= maxIndex || show
                            })} key={i}>
                                <div className="p-3">
                                    <div>
                                        <div>
                                            ❓{e.question}
                                        </div>
                                        <div className='flex text-sm gap-1 mt-1'>
                                            <ArrowUpIcon className='h-4 w-4' /> {timestampToYYYYMMDDHHMMSS(e.answered_at)}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-3">
                                    <AnswerRenderer enquiry={e} />
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        );
    }
);

export default EnquiryCard