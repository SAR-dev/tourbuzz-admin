import { FaceSmileIcon } from '@heroicons/react/24/solid'
import Modal from './Modal'
import { useEffect, useState } from 'react'
import { EmojiType, emojis } from '@src/constants/emojis'
import { toast } from 'react-toastify'
import Fuse from 'fuse.js'
import { useEmojiStore } from '@src/store'

const fuseOptions = {
    keys: [
        "name",
        "name"
    ],
    shouldSort: true,
    ignoreLocation: true
};

const fuseIndex = Fuse.createIndex(fuseOptions.keys, emojis)

const fuse = new Fuse(emojis, fuseOptions, fuseIndex);

const EmojiPicker = () => {
    const {open, toogleOpen} = useEmojiStore()
    const [emojisList, setEmojiList] = useState<EmojiType[]>([...emojis])
    const [search, setSearch] = useState("")

    useEffect(() => {
        if (search.length >= 3) {
            setEmojiList(fuse.search(search).map(e => e.item))
        }
    }, [search])

    const findSimilar = (name: string) => {
        setEmojiList(fuse.search(name).map(e => e.item))
    }

    const copyToClipboard = async (text: string) => {
        await toast.promise(
            navigator.clipboard.writeText(text),
            {
                success: text + ' Copied',
                error: 'Copy Failed 🤯'
            }
        );
    };

    return (
        <div>
            <button className="btn btn-sm h-10 bg-transparent border-transparent shadow-none w-full flex justify-start" onClick={toogleOpen}>
                <FaceSmileIcon className='h-5 w-5' />
                Emoji
            </button>
            <Modal title="Emoji Picker" open={open} handleClose={toogleOpen} width='60rem' height='40rem' maxWidth='60rem' footer={
                <div className='flex items-center w-full'>
                    <p>👆 Click emoji to copy</p>
                    <button className="btn ml-auto" onClick={toogleOpen}>
                        Close
                    </button>
                </div>
            }>
                <div>
                    <input type="text" placeholder="Type at least 3 characters here" className="input input-bordered w-full max-w-xs" value={search} onChange={e => setSearch(e.target.value)} />
                    <div className="flex flex-wrap mt-2 p-2 bg-base-200 custom-scrollbar overflow-y-auto h-[25rem]">
                        {emojisList.map((e, i) => (
                            <div className='mr-2 mb-2 border border-base-300 w-20 h-fit' key={i}>
                                <div className="h-16 w-20 items-center justify-center card cursor-pointer hover:bg-base-100" onClick={() => copyToClipboard(e.emoji)}>
                                    <p className="text-4xl">{e.emoji}</p>
                                </div>
                                <div className="text-xs flex justify-center items-center cursor-pointer w-20 h-6 border-t border-base-300 hover:bg-base-100" onClick={() => findSimilar(e.name)}>
                                    <div>Similar</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default EmojiPicker