import { ImageType } from '@src/types';
import { useState } from 'react';
import { Img } from 'react-image'
import { Lightbox } from "react-modal-image";

const placeholder = "https://i.postimg.cc/CKj5TBc2/image.png";

const Image = ({ 
    image, 
    className, 
    disableModal, 
    disableThumbnail 
}: { 
    image: ImageType | null, 
    className: string, 
    disableModal?: boolean, 
    disableThumbnail?: boolean
 }) => {
    const [open, setOpen] = useState(false)
    const toogleOpen = () => setOpen(!open)

    return (
        <>
            <Img src={[image ? (disableThumbnail ? image.optimized_url : image.thumbnail_url) : placeholder, placeholder]} alt="" className={className} onClick={toogleOpen} />
            {image && open && !disableModal && (
                <Lightbox
                    medium={image.optimized_url}
                    large={image.source_url}
                    title={image.title}
                    // @ts-ignore
                    onClose={toogleOpen}
                />
            )}
        </>
    )
}

export default Image