import classNames from "classnames";
import { ReactNode } from "react";

interface ModalType {
    title: string;
    footer: ReactNode;
    open: boolean;
    handleClose: () => void;
    maxWidth?: string;
    width?: string;
    height?: string;
    children: ReactNode;
}

const Modal = ({...props}: ModalType) => {
    return (
        <dialog className={classNames({
            "modal": true,
            "modal-open": props.open
        })}>
            <div className="modal-box w-fit card" style={{
                maxWidth: props.maxWidth ?? (props.width ?? "50rem"),
                width: props.width ?? "auto",
                height: props.height ?? "auto",
            }}>
                <h3 className="font-bold text-lg">{props.title}</h3>
                <div className="py-4 h-fill">
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