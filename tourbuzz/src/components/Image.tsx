import { useState } from 'react';
import { Img } from 'react-image'
import { Lightbox } from "react-modal-image";

const placeholder = "https://i.postimg.cc/CKj5TBc2/image.png";

const Image = ({ src, className }: { src?: string, className: string }) => {
    const [open, setOpen] = useState(false)
    const toogleOpen = () => setOpen(!open)

    return (
        <>
            <Img src={[src ?? "", placeholder]} alt="" className={className} onClick={toogleOpen} />
            {src && open && (
                <Lightbox
                    medium={src}
                    large={src}
                    // @ts-ignore
                    onClose={toogleOpen}
                />
            )}
        </>
    )
}

export default Image