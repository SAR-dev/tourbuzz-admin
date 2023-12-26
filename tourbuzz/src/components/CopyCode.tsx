import { ClipboardIcon } from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";

function CopyCode({ text }: { text: string }) {
    const copyToClipboard = async () => {
        await toast.promise(
            navigator.clipboard.writeText(text),
            {
                success: 'Link copied 👌',
                error: 'Copy Failed 🤯'
            }
        );
    };
    return (
        <>
            <div className="bg-blue-100 flex gap-5 items-center justify-between py-3 px-5 rounded w-fill">
                <code className="text-blue-900 max-w-64 text-left whitespace-nowrap overflow-hidden overflow-ellipsis">
                    {text}
                </code>
                <ClipboardIcon className="h-5 w-5 text-black cursor-pointer" onClick={copyToClipboard} />
            </div>
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                theme="dark"
            />
        </>
    )
}

export default CopyCode