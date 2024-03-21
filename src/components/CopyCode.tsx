import { ClipboardIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

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
        <button className="btn flex-1" onClick={copyToClipboard}>
            <ClipboardIcon className="h-5 w-5" />
            Copy Link
        </button>
    )
}

export default CopyCode