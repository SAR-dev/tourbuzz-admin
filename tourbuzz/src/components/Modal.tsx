import classNames from "classnames";
import { ReactNode } from "react";

interface ModalType {
    open: boolean;
    handleClose: () => void;
    title: string;
    children: ReactNode;
    footer: ReactNode;
}

const Modal = ({...props}: ModalType) => {
    return (
        <dialog className={classNames({
            "modal": true,
            "modal-open": props.open
        })}>
            <div className="modal-box max-w-[50rem] w-fit">
                <h3 className="font-bold text-lg">{props.title}</h3>
                <div className="py-4">
                    {props.children}
                </div>
                <div className="flex">
                    {props.footer}
                </div>
            </div>
        </dialog>
    )
}

export default Modal