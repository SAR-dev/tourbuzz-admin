import { FaceSmileIcon } from '@heroicons/react/24/solid'
import Modal from './Modal'
import { useEffect, useState } from 'react'
import { EmojiType, emojis } from '@src/constants/emojis'
import { toast } from 'react-toastify'
import Fuse from 'fuse.js'

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
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(!open);
    const [emojisList, setEmojiList] = useState<EmojiType[]>([...emojis])
    const [search, setSearch] = useState("")

    useEffect(() => {
      if(search.length >= 3){
        setEmojiList(fuse.search(search).map(e => e.item))
      }
    }, [search])

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
            <button className="btn btn-sm h-10 bg-transparent border-transparent shadow-none w-full flex justify-start" onClick={handleOpen}>
                <FaceSmileIcon className='h-5 w-5' />
                Emoji
            </button>
            <Modal title="Emoji Picker" open={open} handleClose={handleOpen} width='60rem' height='40rem' maxWidth='60rem' footer={
                <div className='flex items-center w-full'>
                    <p>👆 Click emoji to copy</p>
                    <button className="btn ml-auto" onClick={handleOpen}>
                        Close
                    </button>
                </div>
            }>
                <div>
                    <input type="text" placeholder="Type at least 3 characters here" className="input input-bordered w-full max-w-xs" value={search} onChange={e => setSearch(e.target.value)} />
                    <div className="flex flex-wrap mt-2 p-2 bg-base-200 custom-scrollbar overflow-y-auto h-[25rem]">
                        {emojisList.map((e, i) => (
                            <div className="h-16 w-16 border border-base-300 items-center justify-center card mr-2 mb-2 cursor-pointer hover:bg-base-100" onClick={() => copyToClipboard(e.emoji)} key={i}>
                                <p className="text-4xl">{e.emoji}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default EmojiPicker