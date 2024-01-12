import { PhotoIcon } from "@heroicons/react/24/outline";
import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/24/solid";
import ImageUploader from "@src/components/ImageUploader";
import {
  ArticleType,
  ImageType,
  WriterType,
  parseErrorMessage,
} from "@src/types";
import { useEffect, useState } from "react";
import ErrorAlert from "@src/components/ErrorAlert";
import WriterSelect from "@src/components/WriterSelect";
import {
  deleteArticleById,
  getArticleById,
  updateArticle,
} from "@src/functions/api";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";
import PageHeader from "@src/components/PageHeader";
import MarkdownEditor from "@src/components/MarkdownEditor";
import { useNavigate, useParams } from "react-router-dom";
import { generateSlug } from "@src/functions/helpers";
import DeleteButton from "@src/components/DeleteButton";
import { MAX_ARTICLE_IMAGE_COUNT } from "@src/constants/values";
import Image from "@src/components/Image";

interface ArticleUpdateState {
  title: string;
  slug: string;
  subtitle: string;
  summary: string;
  md_desc: string;
  images: ImageType[];
  writer: WriterType | null;
}

const UpdateArticle = () => {
  let { articleId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ArticleUpdateState>({
    writer: null,
    title: "",
    slug: "",
    subtitle: "",
    summary: "",
    md_desc: "",
    images: [],
  });
  const [error, setError] = useState("");

  const setWriter = (writer: WriterType) => {
    setData({ ...data, writer });
  };

  useEffect(() => {
    getArticleById({ id: Number(articleId) }).then((res) => {
      const article: ArticleType = res.data;
      setData({ ...article });
      setWriter(article.writer);
    });
  }, [articleId]);

  const setImages = (image: ImageType) => {
    if (data.images.length >= MAX_ARTICLE_IMAGE_COUNT) {
      toast.info("Maximum image uploaded");
    }
    setData({ ...data, images: [...data.images, image] });
  };

  const removeImage = (id: number) => {
    setData({ ...data, images: [...data.images.filter((e) => e.id !== id)] });
  };

  const handleTitleChange = (title: string) => {
    setData({ ...data, title: title, slug: generateSlug(title) });
  };

  const setMdDesc = (value: string) => {
    setData({ ...data, md_desc: value });
  };

  const handleSubmit = async () => {
    if (!data.writer?.id) {
      setError("Select writer.");
      return;
    }
    setError("");
    setLoading(true);
    updateArticle({
      articles_id: Number(articleId),
      title: data.title,
      slug: data.slug,
      subtitle: data.subtitle,
      summary: data.summary,
      md_desc: data.md_desc,
      image_ids: data.images.map((e) => e.id),
      writers_id: data.writer.id,
    }).then((res) => {
      if (res.error) {
        toast.error("Article update failed 🤦‍♂️");
        setError(parseErrorMessage(res.error).message);
        setLoading(false);
      } else {
        toast.success("Article updated 💪");
        queryClient.invalidateQueries("articles");
        setLoading(false);
        navigate("/articles");
      }
    });
  };

  const handleDelete = () => {
    setDeleting(true);
    deleteArticleById({ id: Number(articleId) }).then((res) => {
      if (res.error) {
        toast.error("Delete failed 🤦‍♂️");
        setError(parseErrorMessage(res.error).message);
        setDeleting(false);
      } else {
        toast.success("Article Deleted 💪");
        queryClient.invalidateQueries("articles");
        setDeleting(false);
        navigate("/articles");
      }
    });
  };

  return (
    <div className="grid grid-cols-1 gap-5">
      <PageHeader
        title="Write a article"
        subtitle="Before writing the article please review the contents carefully 🧐"
      />

      <div className="grid grid-cols-2 gap-5 p-5 card bg-base-200">
        <div>
          <div className="grid grid-cols-3 gap-3">
            {data.images.map((e, i) => (
              <div className="h-52 w-full relative group" key={i}>
                <Image image={e} className="h-52 w-full object-cover card" />
                <div className="absolute top-0 left-0 h-full w-full bg-red-500/50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition ease-in-out">
                  <TrashIcon
                    className="h-10 w-10 cursor-pointer text-white"
                    onClick={() => removeImage(e.id)}
                  />
                </div>
              </div>
            ))}
            {[...Array(MAX_ARTICLE_IMAGE_COUNT - data.images.length)].map(
              (_e, i) => (
                <div
                  className="h-52 w-full border border-base-300 card bg-base-100 justify-center items-center"
                  key={i}
                >
                  <PhotoIcon className="h-10 w-10" />
                </div>
              )
            )}
            <div className="col-span-3">
              <ImageUploader title="Upload Image" setImage={setImages} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <div>
            <label className="label">Article Headline</label>
            <input
              value={data.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              type="text"
              placeholder="Title"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label">SEO Friendly Slug</label>
            <input
              value={data.slug}
              onChange={(e) => setData({ ...data, slug: e.target.value })}
              type="text"
              placeholder="Slug"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label">Subtle Context</label>
            <input
              value={data.subtitle}
              onChange={(e) => setData({ ...data, subtitle: e.target.value })}
              type="text"
              placeholder="Subtitle"
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="label">Reader-friendly Summary</label>
            <textarea
              value={data.summary}
              onChange={(e) => setData({ ...data, summary: e.target.value })}
              rows={7}
              placeholder="Summary"
              className="textarea textarea-bordered overflow-y-auto custom-scrollbar placeholder:text-base text-base resize-none"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 p-5 card bg-base-200">
        <div className="col-span-2">
          <label className="label">Start writing article here</label>
          <MarkdownEditor
            value={data.md_desc}
            setValue={setMdDesc}
            placeholder="Start writing details in Markdown"
          />
        </div>
        <div>
          <label className="label">Select Writer</label>
          <WriterSelect writer={data.writer} setWriter={setWriter} />
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
            <ArrowLeftIcon className="h-5 w-5" />
            Go Back
          </button>

          <div className="flex space-x-5">
            <DeleteButton handleDelete={handleDelete} loading={deleting} />
            <button
              className="btn btn-info w-48"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Updating
                </>
              ) : (
                "Update"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateArticle;
