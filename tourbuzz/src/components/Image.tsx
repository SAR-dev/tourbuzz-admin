import { Img } from 'react-image'

const placeholder = "https://i.postimg.cc/CKj5TBc2/image.png";

const Image = ({ src, className }: { src?: string, className: string }) => {
    return (
        <Img src={[src ?? "", placeholder]} alt="" className={className} />
    )
}

export default Image