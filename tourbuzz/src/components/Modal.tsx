import { XMarkIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import { ReactNode } from "react";

interface ModalType {
    title: string;
    footer?: ReactNode;
    open: boolean;
    handleClose: () => void;
    maxWidth?: string;
    width?: string;
    height?: string;
    closeButton?: boolean;
    children: ReactNode;
}

const Modal = ({ ...props }: ModalType) => {
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
                <div className="flex w-full justify-between items-center">
                    <h3 className="font-bold text-lg">{props.title}</h3>
                    {props.closeButton && (
                        <button className="btn btn-sm" onClick={props.handleClose}>
                            <XMarkIcon className="h-5 w-5" />
                        </button>
                    )}
                </div>
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