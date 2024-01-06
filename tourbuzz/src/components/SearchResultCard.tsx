import { ImageType } from '@src/constants/types';
import classNames from 'classnames'
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import Image from './Image'

const SearchResultCard = ({
    id,
    avatar,
    title,
    subtitle,
    handleClick,
    selected
}: {
    id: number,
    avatar: ImageType | null,
    title: string,
    subtitle: string,
    handleClick: (id: number) => void,
    selected?: boolean
}) => (
    <div className={classNames({
        "card flex flex-row items-center gap-3 p-3 border border-base-300 cursor-pointer max-w-96": true,
        "bg-primary text-primary-content": selected,
        "bg-base-200 hover:bg-base-300": !selected
    })} onClick={() => handleClick(id)}>
        <div className='w-12 flex-shrink-0'>
            <Image image={avatar} className='h-12 w-16 object-cover card' />
        </div>
        <div className="flex flex-col">
            <div className="font-semibold">{title}</div>
            <div className="text-sm">{subtitle}</div>
        </div>
        {selected && (
            <div className="absolute top-0 left-0 m-1">
                <div className="flex justify-center items-center bg-primary rounded-full p-1">
                    <CheckCircleIcon className='h-5 w-5 text-primary-content' />
                </div>
            </div>
        )}
    </div>
)

export default SearchResultCard;