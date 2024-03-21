import { ArticleType } from "@src/types";
import { ClockIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Image from "./Image";
import { PencilIcon } from "@heroicons/react/16/solid";
import { timestampToYYYYMMDD } from "@src/functions/helpers";

const ArticleCard = ({ article }: { article: ArticleType }) => {
    return (
        <div className="card card-side w-full h-full bg-base-200 p-3 group relative">
            <Link to={`/articles/${article.id}`} className="btn btn-xs h-8 w-8 btn-primary absolute z-[1] opacity-0 group-hover:opacity-100 top-0 right-0 m-4">
                <PencilIcon className="h-5 w-5" />
            </Link>
            <div className="grid grid-cols-1">
                <div className="col-span-1">
                    <div className="carousel w-full">
                        {article.images.map((e, i) => (
                            <div className="carousel-item w-full h-64" key={i}>
                                <Image image={e} className="card w-full h-64 object-cover" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="text-lg font-semibold my-2 line-clamp-2">{article.title}</div>
                    <div className="flex flex-col space-y-1.5 text-sm">
                        <div className="flex justify-between">
                            <div className="flex gap-2 items-center">
                                <UserCircleIcon className="h-5 w-5" />
                                {article.writer.name}
                            </div>
                            <div className="flex gap-2 items-center">
                                <ClockIcon className="h-5 w-5" />
                                {timestampToYYYYMMDD(article.created_at)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArticleCard;