import { getWriters } from '@src/api'
import { WriterType } from '@src/types'
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

function WriterSelect() {
    const { isLoading, error, data } = useQuery<WriterData, Error>(['writers'], () =>
        getWriters({ pageNo: 1, pageSize: 100 })
    )
    return (
        <div>WriterSelect</div>
    )
}

export default WriterSelect