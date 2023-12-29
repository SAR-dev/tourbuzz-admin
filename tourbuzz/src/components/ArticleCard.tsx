import { ArticleType } from "@src/constants/types";
import { CalendarIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { timestampToYYYYMMDD } from "@src/functions/helpers";
import { Link } from "react-router-dom";

const ArticleCard = ({ article }: { article: ArticleType }) => {
    return (
        <div className="card card-side w-full h-full cursor-pointer bg-base-200 hover:hover:bg-base-300 p-3 group relative">
            <Link to={`/articles/update/${article.id}`} className="btn btn-xs btn-primary opacity-0 group-hover:opacity-100 absolute bottom-0 right-0 m-3">Edit</Link>
            <div className="grid grid-cols-2 gap-5">
                <div className="col-span-1">
                    <div className="carousel w-full">
                        {article.images.map((e, i) => (
                            <div className="carousel-item w-full h-64" key={i}>
                                <img src={e.optimized_url} className="card w-full h-64 object-cover" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="text-lg font-semibold">{article.title}</div>
                    <div className="my-3">{article.subtitle}</div>
                    <div className="flex flex-col space-y-1.5">
                        <div className="flex gap-2 items-center">
                            <UserCircleIcon className="h-4 w-4" />
                            {article.writer.name}
                        </div>
                        <div className="flex gap-2 items-center">
                            <CalendarIcon className="h-4 w-4" />
                            Published on {timestampToYYYYMMDD(article.created_at)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArticleCard;