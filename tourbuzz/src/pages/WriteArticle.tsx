import { PhotoIcon } from "@heroicons/react/24/outline"
import { TrashIcon } from "@heroicons/react/24/solid"
import { Button, Input, Textarea } from "@material-tailwind/react"
import ImageUploader from "@src/components/ImageUploader"
import { ImageType } from "@src/types"
import { useState } from "react"
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from "rehype-sanitize";
import ErrorAlert from "@src/components/ErrorAlert"

interface ArticleCreateState {
  title: string
  slug: string
  subtitle: string
  summary: string
  md_desc: string
  images: ImageType[]
  writer_id: number | null
}

const initialArticleCreateState: ArticleCreateState = {
  title: "",
  slug: "",
  subtitle: "",
  summary: "",
  md_desc: "",
  images: [],
  writer_id: null
}

function generateSlug(title: string) {
  return title.trim()                     // Remove leading and trailing spaces
    .toLowerCase()                       // Convert to lowercase
    .replace(/\s+/g, '-')                // Replace spaces with hyphens
    .replace(/[^\w-]+/g, '')             // Remove non-word characters except hyphens
    .replace(/^-+|-+$/g, '');            // Remove leading and trailing hyphens
}

const WriteArticle = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<ArticleCreateState>({ ...initialArticleCreateState })
  const [error, setError] = useState("")

  const setImages = (image: ImageType) => {
    setData({ ...data, images: [...data.images, image] })
  }

  const removeImage = (id: number) => {
    setData({ ...data, images: [...data.images.filter(e => e.id !== id)] })
  }

  const handleTitleChange = (title: string) => {
    setData({ ...data, title: title, slug: generateSlug(title) })
  }

  const setMdDesc = (value?: string) => {
    setData({ ...data, md_desc: value ?? "" })
  }

  return (
    <div>
      <div className="flex items-center justify-between bg-white p-5 rounded">
        <div className="text-left">
          <h1 className="font-semibold text-gray-900 text-2xl">Write a article</h1>
          <p className="mt-1.5 text-sm text-gray-500">Before writing the article please review the contents carefully 🧐</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 p-5 rounded bg-white my-5">
        <div>
          <div className="grid grid-cols-4 gap-3">
            {data.images.map((e, i) => (
              <div className="h-36 w-full relative group" key={i}>
                <img src={e.thumbnail_url} alt="" className="h-36 w-full object-cover rounded" />
                <div className="absolute top-0 left-0 h-full w-full bg-red-500/50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition ease-in-out">
                  <TrashIcon className="h-10 w-10 cursor-pointer text-white" onClick={() => removeImage(e.id)} />
                </div>
              </div>
            ))}
            {[...Array(8 - data.images.length)].map((e, i) => (
              <div className="h-36 w-full border flex justify-center items-center" key={i}>
                <PhotoIcon className="h-10 w-10" />
              </div>
            ))}
            <div className="col-span-4">
              <ImageUploader title="Upload Image" setImage={setImages} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 ">
          <Input value={data.title} onChange={e => handleTitleChange(e.target.value)} label="Title" size="lg" crossOrigin="" />
          <Input value={data.slug} onChange={e => setData({ ...data, slug: e.target.value })} label="Slug" size="lg" crossOrigin="" />
          <Input value={data.subtitle} onChange={e => setData({ ...data, subtitle: e.target.value })} label="Subtitle" size="lg" crossOrigin="" />
          <Textarea value={data.summary} onChange={e => setData({ ...data, summary: e.target.value })} rows={7} label="Summary" size="lg" />
        </div>
      </div>

      <div className="p-5 bg-white rounded mb-5 custom-toolbar">
        <MDEditor
          value={data.md_desc}
          onChange={setMdDesc}
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
        />
      </div>

      <div className="p-5 bg-white rounded mb-5 grid grid-cols-2 gap-5">

        {error.length > 0 && (
          <div className="col-span-2">
            <ErrorAlert error={error} setError={setError} />
          </div>
        )}
        <div></div>
        <Button className="flex justify-center" fullWidth loading={loading}>
          Submit
        </Button>
      </div>
    </div>
  )
}

export default WriteArticle