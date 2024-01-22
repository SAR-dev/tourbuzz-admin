import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { parseErrorMessage } from "@src/types";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";
import { postAd } from "@src/functions/api";
import PageHeader from "@src/components/PageHeader";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "@src/components/ErrorAlert";
import Image from "@src/components/Image";
import { checkImageUrl, getImageTypeFromUrl } from "@src/functions/helpers";
import { AD } from "@src/constants/headers";

interface CreateAdState {
    title: string
    subtitle: string
    link: string
    image_url: string
    active: boolean
}

const CreateAd = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const queryClient = useQueryClient()
    const [data, setData] = useState<CreateAdState>({
        title: "",
        subtitle: "",
        link: "",
        image_url: "",
        active: false
    })
    const [error, setError] = useState("")

    const handleSubmit = async () => {
        setError("")
        setLoading(true)
        postAd({ ...data }).then(res => {
            if (res.error) {
                toast.error("Submission failed 🤦‍♂️")
                setError(parseErrorMessage(res.error).message)
                setLoading(false)
            } else {
                toast.success("Ad Submitted 💪")
                queryClient.invalidateQueries("ads")
                setLoading(false)
                navigate("/ads")
            }

        })
    }

    const handleImageLink = async () => {
        const url = await navigator.clipboard.readText();
        checkImageUrl(
            url,
            () => {
                setData({ ...data, image_url: url })
            },
            () => {
                toast.error("Sorry, we can not use this url");
            }
        );

    }

    const removeImageLink = () => {
        setData({ ...data, image_url: "" })
    }

    return (
        <div className="grid grid-cols-1 gap-5">
            <PageHeader
                title={AD.title}
                subtitle={AD.subtitle}
            />

            <div className="w-[70rem] bg-base-200 card p-5">
                <div className="grid grid-cols-2 gap-2">
                    <div className="grid grid-cols-1 gap-2">
                        <div>
                            <label className="label">Title</label>
                            <input value={data.title} onChange={e => setData({ ...data, title: e.target.value })} type="text" placeholder="Title" className="input input-bordered w-full" />
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="label">Subtitle</label>
                            <textarea value={data.subtitle} onChange={e => setData({ ...data, subtitle: e.target.value })} rows={5} placeholder="Subtitle" className="textarea textarea-bordered custom-scrollbar placeholder:text-base text-base resize-none" />
                        </div>
                        <div>
                            <label className="label">Link</label>
                            <input value={data.link} onChange={e => setData({ ...data, link: e.target.value })} type="text" placeholder="Link" className="input input-bordered w-full" />
                        </div>
                        <div>
                            <div className="form-control inline-block">
                                <label className="label cursor-pointer">
                                    <input onChange={e => setData({...data, active: e.target.checked})} type="checkbox" checked={data.active} className="checkbox" />
                                    <span className="label-text ml-2">Active</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="label">Thumbnail</label>
                        <div className="p-3 bg-base-100 card border border-base-300">
                            <div className="w-full h-72 aspect-video card border border-base-300 flex justify-center items-center bg-base-100 mb-2">
                                {data.image_url.length > 0 && (
                                    <Image image={getImageTypeFromUrl(data.image_url)} className="card w-full h-72 object-cover" />
                                )}
                            </div>
                            <div className='flex gap-3'>
                                <button className="btn btn-primary w-full flex-1" onClick={handleImageLink}>
                                    Click to paste link
                                </button>
                                <button className="btn btn-warning" onClick={removeImageLink}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {error.length > 1 && (
                <div className="w-[70rem]">
                    <ErrorAlert error={error} setError={setError} />
                </div>
            )}

            <div className="w-[70rem] bg-base-200 card p-5">
                <div className="flex justify-between">
                    <button className="btn btn-outline" onClick={() => navigate(-1)}>
                        <ArrowLeftIcon className='h-5 w-5' />
                        Go Back
                    </button>
                    <button className="btn btn-info w-48" onClick={handleSubmit} disabled={loading}>
                        {loading ? (
                            <>
                                <span className="loading loading-spinner"></span>
                                Submitting
                            </>
                        ) : (
                            "Submit Ad"
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateAd