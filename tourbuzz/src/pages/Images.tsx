import { useQuery } from "react-query"

interface ImageType {
    id: number;
    title: string;
    source_url: string;
    thumbnail_url: string;
    optimized_url: string;
    created_at: Date;
    updated_at: Date;
}

interface ImageData {
    data: ImageType[]
}

const Images = () => {
    const { isLoading, error, data } = useQuery<ImageData , Error>(['images'], () =>
        fetch('http://localhost:8080/admin/images').then(res =>
            res.json()
        )
    )

    if(isLoading) return;

    return (
        <div className="grid grid-cols-5 gap-5">
            {data?.data.map(e => (
                <div>
                    <img src={e.thumbnail_url} />
                </div>
            ))}
        </div>
    )
}

export default Images