import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { ImageType } from "@src/types";
import { useState } from "react"
import ErrorAlert from "@src/components/ErrorAlert"
import { useQueryClient } from "react-query"
import PageHeader from "@src/components/PageHeader"
import { useNavigate } from "react-router-dom"
import TourCreateCard from "@src/components/TourCreateCard";
import TourLogCreateCard from "@src/components/TourLogCreateCard";
import TourPackageCreateCard from "@src/components/TourPackageCreateCard";






interface CreateTourState {
    title: string
    slug: string
    subtitle: string
    summary: string
    md_desc: string
    images: ImageType[]
    writers_id: number | null
}

const CreateTour = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    // const setImages = (image: ImageType) => {
    //     if (data.images.length >= MAX_ARTICLE_IMAGE_COUNT) {
    //         toast.info("Maximum image uploaded")
    //     }
    //     setData({ ...data, images: [...data.images, image] })
    // }

    // const removeImage = (id: number) => {
    //     setData({ ...data, images: [...data.images.filter(e => e.id !== id)] })
    // }

    // const handleTitleChange = (title: string) => {
    //     setData({ ...data, title: title, slug: generateSlug(title) })
    // }

    // const setMdDesc = (value: string) => {
    //     setData({ ...data, md_desc: value })
    // }

    const handleSubmit = async () => {
        setError("")
        setLoading(true)
        // postArticle({
        //     title: data.title,
        //     slug: data.slug,
        //     subtitle: data.subtitle,
        //     summary: data.summary,
        //     md_desc: data.md_desc,
        //     image_ids: data.images.map(e => e.id),
        //     writers_id: writer.id
        // }).then(res => {
        //     if (res.error) {
        //         toast.error("Article handleSubmit failed 🤦‍♂️")
        //         setError(parseErrorMessage(res.error).message)
        //         setLoading(false)
        //     } else {
        //         toast.success("Article Submitted 💪")
        //         queryClient.invalidateQueries("articles")
        //         setLoading(false)
        //         navigate("/articles")
        //     }

        // })
    }

    return (
        <div className="grid grid-cols-1 gap-5">
            <PageHeader
                title="Create A Tour"
                subtitle="Before writing the article please review the contents carefully 🧐"
            />

            <div className="grid grid-cols-1 gap-3">
                <TourCreateCard />
                <TourLogCreateCard />
                <TourPackageCreateCard />
            </div>

            {error.length > 0 && (
                <div>
                    <ErrorAlert error={error} setError={setError} />
                </div>
            )}

            <div className="p-5 card bg-base-200">
                <div className="flex justify-between">
                    <button className="btn btn-outline" onClick={() => navigate(-1)}>
                        <ArrowLeftIcon className='h-5 w-5' />
                        Go Back
                    </button>

                    <div>
                        <button className="btn btn-info w-48" onClick={handleSubmit} disabled={loading}>
                            {loading ? (
                                <>
                                    <span className="loading loading-spinner"></span>
                                    Submitting
                                </>
                            ) : (
                                "Submit"
                            )}
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CreateTour