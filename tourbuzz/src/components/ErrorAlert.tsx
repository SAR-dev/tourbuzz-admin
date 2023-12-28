import { ShieldExclamationIcon } from "@heroicons/react/24/outline";

export default function ErrorAlert({ error, setError }: { error: string, setError: (props: string) => void }) {
    if(error.length == 0) return;
    return (
        <div role="alert" className="alert alert-warning">
            <ShieldExclamationIcon className="h-6 w-6" />
            <span>Error: {error}</span>
            <button className="btn btn-sm btn-accent btn-outline" onClick={() => setError("")}>
                Close
            </button>
        </div>
    );
}