import { CodeBracketIcon, EyeIcon, FaceSmileIcon, QuestionMarkCircleIcon, Square2StackIcon } from '@heroicons/react/24/outline';
import { useEmojiStore } from '@src/store';
import classNames from 'classnames';
import { useState } from 'react';
import Markdown from 'react-markdown'

interface MarkdownEditorType {
    value: string;
    setValue: (props: string) => void;
    placeholder?: string;
    title?: string;
}

enum Mode {
    CODE_ONLY,
    PREVIEW_ONLY,
    CODE_AND_PREVIEW
}

const MarkdownEditor = ({ ...props }: MarkdownEditorType) => {
    const {open, toogleOpen} = useEmojiStore()
    const [mode, setMode] = useState<Mode>(Mode.CODE_AND_PREVIEW)

    return (
        <div className="border border-base-300 w-full">
            <div className="p-3 border-b border-base-300 flex items-center w-full">
                <p className='font-semibold text-sm'>
                    {props.title}
                </p>
                <div className="ml-auto flex space-x-3">
                    <button 
                        className={classNames({
                            "btn btn-xs btn-outline tooltip": true,
                            "btn-active": mode === Mode.CODE_ONLY
                        })} 
                        onClick={() => setMode(Mode.CODE_ONLY)}
                        data-tip="Markdown Editor"
                    >
                        <CodeBracketIcon className='h-5 w-5' />
                    </button>
                    <button 
                        className={classNames({
                            "btn btn-xs btn-outline tooltip": true,
                            "btn-active": mode === Mode.PREVIEW_ONLY
                        })} 
                        onClick={() => setMode(Mode.PREVIEW_ONLY)}
                        data-tip="Markdown Preview"
                    >
                        <EyeIcon className='h-5 w-5' />
                    </button>
                    <button 
                        className={classNames({
                            "btn btn-xs btn-outline tooltip": true,
                            "btn-active": mode === Mode.CODE_AND_PREVIEW
                        })} 
                        onClick={() => setMode(Mode.CODE_AND_PREVIEW)}
                        data-tip="Markdown Editor & Preview"
                    >
                        <Square2StackIcon className='h-5 w-5' />
                    </button>
                    <button 
                        className={classNames({
                            "btn btn-xs btn-outline tooltip": true,
                            "btn-active": open
                        })}  
                        onClick={toogleOpen} 
                        data-tip="Emoji Picker"
                    >
                        <FaceSmileIcon className='h-5 w-5' />
                    </button>
                    <a href="https://dillinger.io/" target='_blank' className="btn btn-outline btn-xs tooltip" data-tip="Markdown Help">
                        <QuestionMarkCircleIcon className='h-5 w-5' />
                    </a>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-1 divide-x divide-base-300">
                <div className='flex'>
                    <textarea
                        className="h-[30rem] custom-scrollbar overflow-y-auto textarea placeholder:text-base text-base w-full resize-none rounded-none"
                        value={props.value}
                        onChange={e => props.setValue(e.target.value)}
                        placeholder={props.placeholder}
                    />
                </div>
                <div className="h-[30rem] w-full custom-scrollbar overflow-y-auto bg-base-100 px-3 py-2">
                    <div className='markdown'>
                        <Markdown>
                            {props.value}
                        </Markdown>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MarkdownEditor