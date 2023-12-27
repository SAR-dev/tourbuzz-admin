import { Avatar, Button, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from '@material-tailwind/react'
import { getWriters } from '@src/api'
import { WriterType } from '@src/types'
import classNames from 'classnames'
import { useState } from 'react'
import { useQuery } from 'react-query'

interface WriterData {
    data: {
        data: WriterType[]
        page_no: number
        page_size: number
        has_prev: boolean
        has_next: boolean
        total_result: number
        total_pages: number
    }
}

function WriterSelect({ writer, setWriter }: { writer: WriterType | null, setWriter: (props: WriterType) => void }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);

    const { isLoading, error, data } = useQuery<WriterData, Error>(['writers'], () =>
        getWriters({ pageNo: 1, pageSize: 100 })
    )

    if (isLoading || error || !data) return;

    return (
        <div>
            <Button color='blue' variant={writer == null ? "filled" : "outlined"} fullWidth className="flex justify-center" onClick={handleOpen}>
                {writer == null ? "Select Writer" : `Writer: ${writer.name}`}
            </Button>
            <Dialog open={open} handler={handleOpen} size='lg'>
                <DialogHeader>Select a Writer</DialogHeader>
                <DialogBody>
                    <div className="grid grid-cols-3 gap-4">
                        {data.data.data.map((e, i) => (
                            <div className={classNames({
                                "flex items-center gap-4 p-3 border rounded cursor-pointer": true,
                                "bg-blue-300/50": writer?.id == e.id,
                                "bg-gray-100  hover:bg-blue-500/5": writer?.id != e.id
                            })}
                            onClick={() => setWriter(e)}
                            key={i}>
                                <Avatar src={e.avatar.thumbnail_url} alt="avatar" />
                                <div>
                                    <Typography variant="h6">{e.name}</Typography>
                                    <Typography variant="small" color="gray" className="font-normal">
                                        {e.email}
                                    </Typography>
                                </div>
                            </div>
                        ))}
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        color="red"
                        onClick={handleOpen}
                    >
                        <span>Close</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    )
}

export default WriterSelect