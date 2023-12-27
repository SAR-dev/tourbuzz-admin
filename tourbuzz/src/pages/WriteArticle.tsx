import { PhotoIcon } from "@heroicons/react/24/outline"
import { TrashIcon } from "@heroicons/react/24/solid"
import { Button, Input, Textarea } from "@material-tailwind/react"
import ImageUploader from "@src/components/ImageUploader"
import { ImageType, WriterType, parseErrorMessage } from "@src/types"
import { useState } from "react"
import MDEditor, { commands } from '@uiw/react-md-editor';
import rehypeSanitize from "rehype-sanitize";
import ErrorAlert from "@src/components/ErrorAlert"
import WriterSelect from "@src/components/WriterSelect"
import { postArticle } from "@src/api"
import { toast } from "react-toastify"
import { useQueryClient } from "react-query"

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

const title = {
  name: 'title3',
  keyCommand: 'title3',
  buttonProps: { 'aria-label': 'Insert title' },
  icon: (
    <svg width="12" height="12" viewBox="0 0 520 520">
      <path fill="currentColor" d="M15.7083333,468 C7.03242448,468 0,462.030833 0,454.666667 L0,421.333333 C0,413.969167 7.03242448,408 15.7083333,408 L361.291667,408 C369.967576,408 377,413.969167 377,421.333333 L377,454.666667 C377,462.030833 369.967576,468 361.291667,468 L15.7083333,468 Z M21.6666667,366 C9.69989583,366 0,359.831861 0,352.222222 L0,317.777778 C0,310.168139 9.69989583,304 21.6666667,304 L498.333333,304 C510.300104,304 520,310.168139 520,317.777778 L520,352.222222 C520,359.831861 510.300104,366 498.333333,366 L21.6666667,366 Z M136.835938,64 L136.835937,126 L107.25,126 L107.25,251 L40.75,251 L40.75,126 L-5.68434189e-14,126 L-5.68434189e-14,64 L136.835938,64 Z M212,64 L212,251 L161.648438,251 L161.648438,64 L212,64 Z M378,64 L378,126 L343.25,126 L343.25,251 L281.75,251 L281.75,126 L238,126 L238,64 L378,64 Z M449.047619,189.550781 L520,189.550781 L520,251 L405,251 L405,64 L449.047619,64 L449.047619,189.550781 Z" />
    </svg>
  ),
  execute: (state: { selectedText: any }, api: { replaceSelection: (arg0: string) => void }) => {
    let modifyText = `### ${state.selectedText}\n`;
    if (!state.selectedText) {
      modifyText = `### `;
    }
    api.replaceSelection(modifyText);
  },
};

const WriteArticle = () => {
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<ArticleCreateState>({ ...initialArticleCreateState })
  const [error, setError] = useState("")
  const [writer, setWriter] = useState<WriterType | null>(null)

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

  const uploadArticle = async () => {
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
      writers_id: writer?.id
    }).then(res => {
      if (res.error) {
        toast.error("Article submit failed 🤦‍♂️")
        setError(parseErrorMessage(res.error).message)
        setLoading(false)
      } else {
        toast.success("Article Submitted 💪")
        queryClient.invalidateQueries("articles")
        setLoading(false)
        setData({ ...initialArticleCreateState })
        setWriter(null)
      }

    })
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
          commands={[
            title, commands.bold, commands.italic, commands.strikethrough, commands.hr, commands.divider,
            commands.link, commands.quote, commands.image, commands.divider,
            commands.unorderedListCommand, commands.orderedListCommand, commands.checkedListCommand, commands.divider,
            commands.help
          ]}
          enableScroll
          height={400}
        />
      </div>

      <div className="p-5 bg-white rounded mb-5 grid grid-cols-2 gap-5">

        {error.length > 0 && (
          <div className="col-span-2">
            <ErrorAlert error={error} setError={setError} />
          </div>
        )}
        <WriterSelect writer={writer} setWriter={setWriter} />
        <Button className="flex justify-center" fullWidth loading={loading} onClick={uploadArticle}>
          Submit
        </Button>
      </div>
    </div>
  )
}

export default WriteArticle