import { MAX_ARTICLE_IMAGE_COUNT } from '@src/constants/values';
import { generateSlug } from '@src/functions/helpers';
import { ImageType } from '@src/types';
import { useState } from 'react';
import { toast } from 'react-toastify';

export interface TourCreateState {
    tour_types_id: number | null;
    organizers_id: number | null;
    avatar: ImageType | null;
    title: string;
    slug: string;
    md_desc: string;
    summary: string;
    group_size: string;
    group_info: string;
    services: string;
    transports: string;
    cancel_ins: string;
    start_ins: string;
    finish_ins: string;
    start_at: string;
    finish_at: string;
    last_sell_at: string;
    images: ImageType[];
}

const TourCreateCard = () => {
    const [tourData, setTourData] = useState<TourCreateState>({
        tour_types_id: null,
        organizers_id: null,
        avatar: null,
        title: '',
        slug: '',
        md_desc: '',
        summary: '',
        group_size: '',
        group_info: '',
        services: '',
        transports: '',
        cancel_ins: '',
        start_ins: '',
        finish_ins: '',
        start_at: '',
        finish_at: '',
        last_sell_at: '',
        images: [],
    })

    // fetch tour types

    const setImages = (image: ImageType) => {
        if (tourData.images.length >= MAX_ARTICLE_IMAGE_COUNT) {
            toast.info("Maximum image uploaded")
        }
        setTourData({ ...tourData, images: [...tourData.images, image] })
    }

    const removeImage = (id: number) => {
        setTourData({ ...tourData, images: [...tourData.images.filter(e => e.id !== id)] })
    }

    const handleTitleChange = (title: string) => {
        setTourData({ ...tourData, title: title, slug: generateSlug(title) })
    }

    const setMdDesc = (value: string) => {
        setTourData({ ...tourData, md_desc: value })
    }

    const setAvatar = (image: ImageType) => {
        setTourData({ ...tourData, avatar: image })
    }

    return (
        <div>TourCreateCard</div>
    )
}

export default TourCreateCard