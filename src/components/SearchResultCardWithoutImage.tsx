import classNames from 'classnames'
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const SearchResultCardWithoutImage = ({
    id,
    title,
    subtitle,
    handleClick,
    selected,
    shownInResult
}: {
    id: number,
    title: string,
    subtitle: string,
    handleClick: (id: number) => void,
    selected?: boolean,
    shownInResult?: boolean
}) => (
    <div className={classNames({
        "card flex flex-row items-center gap-3 p-3 border border-base-300 cursor-pointer w-full": true,
        "bg-neutral-content": shownInResult,
        "bg-primary text-primary-content": selected,
        "bg-base-200 hover:bg-base-300": !selected
    })} onClick={() => handleClick(id)}>
        <div className="flex flex-col">
            <div className="font-semibold">{title}</div>
            <div className="text-sm">{subtitle}</div>
        </div>
        {selected && (
            <div className="absolute top-0 right-0 m-1">
                <div className="flex justify-center items-center bg-primary rounded-full p-1">
                    <CheckCircleIcon className='h-5 w-5 text-primary-content' />
                </div>
            </div>
        )}
    </div>
)

export default SearchResultCardWithoutImage;