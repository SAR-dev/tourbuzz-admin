import React from "react";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

interface PaginationType {
    page_no: number
    page_size: number
    has_prev: boolean
    has_next: boolean
    total_result: number
    total_pages: number
    setPageSize: (props: number) => void
    setPageNo: (props: number) => void
}

export function Pagination({ ...props }: PaginationType) {
    const next = () => {
        props.setPageNo(props.page_no + 1);
    };

    const prev = () => {
        props.setPageNo(props.page_no - 1);
    };

    return (
        <div className="flex justify-between w-full p-5 bg-white rounded">
            <div className="flex items-center">
                <span>Page Size</span>
                <div className="flex space-x-2 ml-2">
                    {[10, 20, 50, 100].map((e, i) => (
                        <IconButton
                            size="sm"
                            variant={e === props.page_size ? "gradient" : "outlined"}
                            onClick={() => props.setPageSize(e)}
                            key={i}
                        >
                            <strong>{e}</strong>
                        </IconButton>
                    ))}
                </div>
            </div>
            <div>
                <Typography color="gray" className="font-normal">
                    Total {props.total_result} result found
                </Typography>
            </div>
            <div className="flex items-center gap-8">
                <IconButton
                    size="sm"
                    variant="outlined"
                    onClick={prev}
                    disabled={props.page_no === 1}
                >
                    <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                </IconButton>
                <Typography color="gray" className="font-normal">
                    Page <strong className="text-gray-900">{props.page_no}</strong> of{" "}
                    <strong className="text-gray-900">{props.total_pages}</strong>
                </Typography>
                <IconButton
                    size="sm"
                    variant="outlined"
                    onClick={next}
                    disabled={props.page_no === props.total_pages}
                >
                    <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                </IconButton>
            </div>
        </div>
    );
}