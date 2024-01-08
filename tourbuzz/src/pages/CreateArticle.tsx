import { PhotoIcon } from "@heroicons/react/24/outline"
import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/24/solid"
import ImageUploader from "@src/components/ImageUploader"
import { ImageType, WriterType, parseErrorMessage } from "@src/types"
import { useState } from "react"
import ErrorAlert from "@src/components/ErrorAlert"
import WriterSelect from "@src/components/WriterSelect"
import { postArticle } from "@src/functions/api"
import { toast } from "react-toastify"
import { useQueryClient } from "react-query"
import PageHeader from "@src/components/PageHeader"
import MarkdownEditor from "@src/components/MarkdownEditor"
import { useNavigate } from "react-router-dom"
import { generateSlug } from "@src/functions/helpers"
import { MAX_ARTICLE_IMAGE_COUNT } from "@src/constants/values"
import Image from "@src/components/Image"

interface CreateArticleState {
  title: string
  slug: string
  subtitle: string
  summary: string
  md_desc: string
  images: ImageType[]
  writers_id: number | null
}

const CreateArticle = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<CreateArticleState>({
    title: "",
    slug: "",
    subtitle: "",
    summary: "",
    md_desc: "",
    images: [],
    writers_id: null
  })
  const [error, setError] = useState("")
  const [writer, setWriter] = useState<WriterType | null>(null)

  const setImages = (image: ImageType) => {
    if (data.images.length >= MAX_ARTICLE_IMAGE_COUNT) {
      toast.info("Maximum image uploaded")
    }
    setData({ ...data, images: [...data.images, image] })
  }

  const removeImage = (id: number) => {
    setData({ ...data, images: [...data.images.filter(e => e.id !== id)] })
  }

  const handleTitleChange = (title: string) => {
    setData({ ...data, title: title, slug: generateSlug(title) })
  }

  const setMdDesc = (value: string) => {
    setData({ ...data, md_desc: value })
  }

  const handleSubmit = async () => {
    if (!writer?.id) {
      setError("Select writer.")
      return;
    };
    setError("")
    setLoading(true)
    postArticle({
      title: data.title,
      slug: data.slug,
      subtitle: data.subtitle,
      summary: data.summary,
      md_desc: data.md_desc,
      image_ids: data.images.map(e => e.id),
      writers_id: writer.id
    }).then(res => {
      if (res.error) {
        toast.error("Article handleSubmit failed 🤦‍♂️")
        setError(parseErrorMessage(res.error).message)
        setLoading(false)
      } else {
        toast.success("Article Submitted 💪")
        queryClient.invalidateQueries("articles")
        setLoading(false)
        navigate("/articles")
      }

    })
  }

  return (
    <div className="grid grid-cols-1 gap-5">
      <PageHeader
        title="Write a article"
        subtitle="Before writing the article please review the contents carefully 🧐"
      />

      <div className="grid grid-cols-2 gap-3 p-5 card bg-base-200">
        <div>
          <div className="grid grid-cols-3 gap-3">
            {data.images.map((e, i) => (
              <div className="h-48 w-full relative group" key={i}>
                <Image image={e} className="h-48 w-full object-cover card" />
                <div className="absolute top-0 left-0 h-full w-full bg-red-500/50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition ease-in-out">
                  <TrashIcon className="h-10 w-10 cursor-pointer text-white" onClick={() => removeImage(e.id)} />
                </div>
              </div>
            ))}
            {[...Array(MAX_ARTICLE_IMAGE_COUNT - data.images.length)].map((_e, i) => (
              <div className="h-48 w-full border border-base-300 card bg-base-100 justify-center items-center" key={i}>
                <PhotoIcon className="h-10 w-10" />
              </div>
            ))}
            <div className="col-span-3">
              <ImageUploader title="Upload Image" setImage={setImages} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <div>
            <label className="text-sm font-semibold">Article Headline</label>
            <input value={data.title} onChange={e => handleTitleChange(e.target.value)} type="text" placeholder="Title" className="input input-bordered w-full" />
          </div>
          <div>
            <label className="text-sm font-semibold">SEO Friendly Slug</label>
            <input value={data.slug} onChange={e => setData({ ...data, slug: e.target.value })} type="text" placeholder="Slug" className="input input-bordered w-full" />
          </div>
          <div>
            <label className="text-sm font-semibold">Subtle Context</label>
            <input value={data.subtitle} onChange={e => setData({ ...data, subtitle: e.target.value })} type="text" placeholder="Subtitle" className="input input-bordered w-full" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold">Reader-friendly Summary</label>
            <textarea value={data.summary} onChange={e => setData({ ...data, summary: e.target.value })} rows={7} placeholder="Summary" className="textarea textarea-bordered overflow-y-auto custom-scrollbar placeholder:text-base text-base resize-none" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 p-5 card bg-base-200">
        <div>
          <label className="text-sm font-semibold mb-2">Start writing article here</label>
          <MarkdownEditor
            value={data.md_desc}
            setValue={setMdDesc}
            placeholder="Start writing details in Markdown"
            title="Details in Markdown"
          />
        </div>
        <div>
          <label className="text-sm font-semibold mb-2">Select Writer</label>
          <WriterSelect writer={writer} setWriter={setWriter} />
        </div>
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

export default CreateArticle