import classNames from "classnames";
import { ReactNode } from "react";

interface ModalType {
    maxWidth?: string;
    width?: string;
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
            <div className="modal-box w-fit card" style={{
                maxWidth: props.maxWidth ?? "50rem",
                width: props.width ?? "auto"
            }}>
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