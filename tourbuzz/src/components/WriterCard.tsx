import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
} from "@material-tailwind/react";
import { WriterType } from "@src/types";
import WriterUpdater from "./WriterUpdater";
import { useState } from "react";

export function WriterCard({ writer }: { writer: WriterType }) {
    const [open, setOpen] = useState(false)
    return (
        <div>
            <Card color="transparent" shadow={false} className="w-full bg-white hover:bg-blue-200/50 cursor-pointer p-5" onClick={() => setOpen(true)}>
                <CardHeader
                    color="transparent"
                    floated={false}
                    shadow={false}
                    className="mx-0 flex items-center gap-4 pt-0 pb-3"
                >
                    <Avatar
                        size="lg"
                        variant="circular"
                        src={writer.avatar.thumbnail_url}
                        alt={writer.name}
                    />
                    <div className="flex w-full flex-col gap-0.5">
                        <div className="flex items-center justify-between">
                            <Typography variant="h5" color="blue-gray">
                                {writer.name}
                            </Typography>
                        </div>
                        <Typography color="blue-gray">Email: {writer.email}</Typography>
                    </div>
                </CardHeader>
                <CardBody className="p-0">
                        &quot;{writer.about}&quot;
                </CardBody>
            </Card>
            <WriterUpdater writer={writer} open={open} setOpen={setOpen} />
        </div>
    );
}