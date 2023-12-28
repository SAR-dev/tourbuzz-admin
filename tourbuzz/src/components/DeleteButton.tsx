import React, { useEffect, useState } from 'react'
import Modal from './Modal'

const DeleteButton = ({ handleDelete, loading }: { handleDelete: () => void, loading: boolean }) => {
    const [seconds, setSeconds] = useState(10);
    const [show, setShow] = useState(false)

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (!show) setSeconds(10);
            if (show && seconds > 0) {
                setSeconds(seconds - 1);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [seconds, show]);

    const handleClose = () => {
        setShow(false)
    }

    const getCountDownStyle = (time: number) => ({ "--value": time } as React.CSSProperties)

    return (
        <div>
            <button className="btn btn-warning" onClick={() => setShow(true)}>
                {loading ? (
                    <>
                        <span className="loading loading-spinner"></span>
                        Deleting
                    </>
                ) : (
                    "Delete"
                )}
            </button>
            <Modal width='30rem' maxWidth='30rem' open={show} handleClose={handleClose} title="Warning!!!" footer={
                <div className='flex space-x-3 ml-auto'>
                    <button className="btn btn-success" onClick={() => setShow(false)}>Do not proceed</button>
                    <button className="btn btn-error" disabled={seconds != 0} onClick={handleDelete}>I understand. Proceed</button>
                </div>
            }>
                <div className='bg-warning p-5 card text-center text-warning-content'>
                    You can not undo this action. Please be careful.
                    <br />
                    Wait till the countdown ends.
                    <br />
                    <div className="flex justify-center mt-5">
                        <div className="card w-20 h-20 bg-accent text-accent-content items-center justify-center">
                            <span className="countdown font-mono text-3xl">
                                <span style={getCountDownStyle(seconds)}></span>
                            </span>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default DeleteButton