import { ArticleType } from "@src/constants/types";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Image from "./Image";

const ArticleCard = ({ article }: { article: ArticleType }) => {
    return (
        <div className="card card-side w-full h-full bg-base-200 p-3 group relative">
            <Link to={`/articles/${article.id}`} className="btn btn-xs btn-primary opacity-0 group-hover:opacity-100 absolute bottom-0 right-0 m-3">Edit</Link>
            <div className="grid grid-cols-1">
                <div className="col-span-1">
                    <div className="carousel w-full">
                        {article.images.map((e, i) => (
                            <div className="carousel-item w-full aspect-video" key={i}>
                                <Image disableThumbnail image={e} className="card w-full aspect-video object-cover" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="text-lg font-semibold my-2">{article.title}</div>
                    <div className="flex flex-col space-y-1.5">
                        <div className="flex gap-2 items-center">
                            <UserCircleIcon className="h-5 w-5" />
                            {article.writer.name}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArticleCard;