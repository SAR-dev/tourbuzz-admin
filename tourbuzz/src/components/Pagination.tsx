import { getSortedArray } from "@src/functions/helpers";
import classNames from "classnames";

interface PaginationType {
    page_no: number
    page_size: number
    has_prev: boolean
    has_next: boolean
    total_result: number
    total_pages: number
    setPageSize: (props: number) => void
    setPageNo: (props: number) => void
    page_sizes?: number[]
}

export function Pagination({ page_sizes = [20, 50, 100], ...props }: PaginationType) {
    const next = () => {
        props.setPageNo(props.page_no + 1);
    };

    const prev = () => {
        props.setPageNo(props.page_no - 1);
    };

    return (
        <div className="card text-sm flex-row justify-between w-full p-3 bg-base-200">
            <div className="flex gap-2 items-center">
                <span>Page Size</span>
                <div className="join border border-base-300">
                    {(getSortedArray([props.page_size, ...page_sizes])).map((e, i) => (
                        <button className={classNames({
                            "join-item btn btn-sm px-3": true,
                            "btn-neutral": e == props.page_size
                        })} onClick={() => props.setPageSize(e)} key={i}>
                            {e}
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex items-center">
                <p>Total <strong>{props.total_result}</strong> result found</p>
            </div>
            <div className="flex items-center gap-8">
                <div className="join border border-base-300">
                    <button className="join-item btn btn-sm btn-neutral" onClick={prev} disabled={props.page_no === 1}>«</button>
                    <div className="join-item flex items-center px-2">Page <strong className="px-1">{props.page_no}</strong> of <strong className="px-1">{props.total_pages}</strong></div>
                    <button className="join-item btn btn-sm btn-neutral" onClick={next} disabled={props.page_no === props.total_pages}>»</button>
                </div>
            </div>
        </div>
    );
}