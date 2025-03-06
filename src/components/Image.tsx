import { ImageType } from '@src/types';
import { useState } from 'react';
import { Img } from 'react-image'
import { Lightbox } from "react-modal-image";

const placeholder = "https://i.postimg.cc/CKj5TBc2/image.png";

const Image = ({ 
    image, 
    className, 
    disableModal, 
    enaableThumbnail 
}: { 
    image: ImageType | null, 
    className: string, 
    disableModal?: boolean, 
    enaableThumbnail?: boolean
 }) => {
    const [open, setOpen] = useState(false)
    const toogleOpen = () => setOpen(!open)

    return (
        <>
            <Img src={[image ? (enaableThumbnail ? image.thumbnail_url : image.optimized_url) : placeholder, placeholder]} alt="" className={className} onClick={toogleOpen} />
            {image && open && !disableModal && (
                <Lightbox
                    medium={image.optimized_url}
                    large={image.source_url}
                    // title={image.title}
                    onClose={toogleOpen}
                />
            )}
        </>
    )
}

export default Image