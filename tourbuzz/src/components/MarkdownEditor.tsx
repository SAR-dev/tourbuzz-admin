import { CodeBracketIcon, EyeIcon, FaceSmileIcon, QuestionMarkCircleIcon, Square2StackIcon } from '@heroicons/react/24/outline';
import { PencilIcon } from '@heroicons/react/24/solid';
import { useEmojiStore } from '@src/store';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import Markdown from 'react-markdown'
import useUndoable from 'use-undoable';
import TextareaMarkdown, { TextareaMarkdownRef } from 'textarea-markdown-editor';
import { ArrowWaveLeftUp, ArrowWaveRightDown, Blockquote, Bold, Code, CodeDots, H1, H3, H5, Italic, Link, List, ListNumbers, Photo, SourceCode, Strikethrough } from 'tabler-icons-react';

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
    const [initialized, setInitialized] = useState(false)
    const { open, toogleOpen } = useEmojiStore();
    const [mode, setMode] = useState<Mode>(Mode.CODE_AND_PREVIEW);
    const ref = useRef<TextareaMarkdownRef>(null);
    const [text, setText, { undo, redo }] = useUndoable("")

    useEffect(() => {
        if (initialized) return;
        if (props.value.length > 1) {
            setText(props.value)
        }
    }, [props.value, initialized])

    const handleTextChange = (val: string) => {
        props.setValue(val)
        setText(val)
    }

    const LeftSideToolbar = () => (
        <>
            <button
                className="icon-btn-xs"
                onClick={() => ref.current?.trigger("h1")}
                data-tooltip-id="tooltip"
                data-tooltip-content="Big Header"
            >
                <H1 className='h-5 w-5' />
            </button>
            <button
                className="icon-btn-xs"
                onClick={() => ref.current?.trigger("h3")}
                data-tooltip-id="tooltip"
                data-tooltip-content="Medium Header"
            >
                <H3 className='h-5 w-5' />
            </button>
            <button
                className="icon-btn-xs"
                onClick={() => ref.current?.trigger("h5")}
                data-tooltip-id="tooltip"
                data-tooltip-content="Small Header"
            >
                <H5 className='h-5 w-5' />
            </button>
            <button
                className="icon-btn-xs"
                onClick={() => ref.current?.trigger("bold")}
                data-tooltip-id="tooltip"
                data-tooltip-content="Bold"
            >
                <Bold className='h-5 w-5' />
            </button>
            <button
                className="icon-btn-xs"
                onClick={() => ref.current?.trigger("italic")}
                data-tooltip-id="tooltip"
                data-tooltip-content="Italic"
            >
                <Italic className='h-5 w-5' />
            </button>
            <button
                className="icon-btn-xs"
                onClick={() => ref.current?.trigger("strike-through")}
                data-tooltip-id="tooltip"
                data-tooltip-content="Strike-through"
            >
                <Strikethrough className='h-5 w-5' />
            </button>
            <button
                className="icon-btn-xs"
                onClick={() => ref.current?.trigger("link")}
                data-tooltip-id="tooltip"
                data-tooltip-content="Link"
            >
                <Link className='h-5 w-5' />
            </button>
            <button
                className="icon-btn-xs"
                onClick={() => ref.current?.trigger("image")}
                data-tooltip-id="tooltip"
                data-tooltip-content="Image"
            >
                <Photo className='h-5 w-5' />
            </button>
            <button
                className="icon-btn-xs"
                onClick={() => ref.current?.trigger("unordered-list")}
                data-tooltip-id="tooltip"
                data-tooltip-content="Unordered List"
            >
                <List className='h-5 w-5' />
            </button>
            <button
                className="icon-btn-xs"
                onClick={() => ref.current?.trigger("ordered-list")}
                data-tooltip-id="tooltip"
                data-tooltip-content="Ordered List"
            >
                <ListNumbers className='h-5 w-5' />
            </button>
            <button
                className="icon-btn-xs"
                onClick={() => ref.current?.trigger("block-quotes")}
                data-tooltip-id="tooltip"
                data-tooltip-content="Block Quote"
            >
                <Blockquote className='h-5 w-5' />
            </button>
            <button
                className="icon-btn-xs"
                onClick={() => ref.current?.trigger("code-block")}
                data-tooltip-id="tooltip"
                data-tooltip-content="Code Block"
            >
                <Code className='h-5 w-5' />
            </button>
            <button
                className="icon-btn-xs"
                onClick={() => ref.current?.trigger("code-inline")}
                data-tooltip-id="tooltip"
                data-tooltip-content="Inline Code"
            >
                <CodeDots className='h-5 w-5' />
            </button>
            <button
                className="icon-btn-xs"
                onClick={() => ref.current?.trigger("code")}
                data-tooltip-id="tooltip"
                data-tooltip-content="Code"
            >
                <SourceCode className='h-5 w-5' />
            </button>
            <button
                className="icon-btn-xs"
                onClick={undo}
                data-tooltip-id="tooltip"
                data-tooltip-content="Undo"
            >
                <ArrowWaveLeftUp className='h-5 w-5' />
            </button>
            <button
                className="icon-btn-xs"
                onClick={redo}
                data-tooltip-id="tooltip"
                data-tooltip-content="Redo"
            >
                <ArrowWaveRightDown className='h-5 w-5' />
            </button>
        </>
    )

    const RightSideToolbar = () => (
        <>
            <button
                className={classNames({
                    "icon-btn-xs": true,
                    "btn-active": mode === Mode.CODE_ONLY
                })}
                onClick={() => setMode(Mode.CODE_ONLY)}
                data-tooltip-id="tooltip"
                data-tooltip-content="Markdown Editor"
            >
                <CodeBracketIcon className='h-5 w-5' />
            </button>
            <button
                className={classNames({
                    "icon-btn-xs": true,
                    "btn-active": mode === Mode.PREVIEW_ONLY
                })}
                onClick={() => setMode(Mode.PREVIEW_ONLY)}
                data-tooltip-id="tooltip"
                data-tooltip-content="Markdown Preview"
            >
                <EyeIcon className='h-5 w-5' />
            </button>
            <button
                className={classNames({
                    "icon-btn-xs": true,
                    "btn-active": mode === Mode.CODE_AND_PREVIEW
                })}
                onClick={() => setMode(Mode.CODE_AND_PREVIEW)}
                data-tooltip-id="tooltip"
                data-tooltip-content="Markdown Editor & Preview"
            >
                <Square2StackIcon className='h-5 w-5' />
            </button>
            <button
                className={classNames({
                    "icon-btn-xs": true,
                    "btn-active": open
                })}
                onClick={toogleOpen}
                data-tooltip-id="tooltip"
                data-tooltip-content="Emoji Picker"
            >
                <FaceSmileIcon className='h-5 w-5' />
            </button>
            <a
                href="https://dillinger.io/"
                target='_blank'
                className="icon-btn-xs"
                data-tooltip-id="tooltip"
                data-tooltip-content="Markdown Help">
                <PencilIcon className='h-5 w-5' />
            </a>
            <a
                href="https://www.markdownguide.org/basic-syntax/"
                target='_blank'
                className="icon-btn-xs"
                data-tooltip-id="tooltip"
                data-tooltip-content="Markdown Rules">
                <QuestionMarkCircleIcon className='h-5 w-5' />
            </a>
        </>
    )

    return (
        <div className="border border-base-300 w-full">
            <div className="border-b border-base-300 flex items-center w-full p-2">
                <div className='flex space-x-3'>
                    <LeftSideToolbar />
                </div>
                <div className="ml-auto flex space-x-3">
                    <RightSideToolbar />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-1 divide-x divide-base-300">
                <div className='flex'>
                    <TextareaMarkdown
                        className="h-[30rem] custom-scrollbar overflow-y-auto textarea placeholder:text-base text-base w-full resize-none rounded-none"
                        value={text}
                        onChange={e => handleTextChange(e.target.value)}
                        placeholder={props.placeholder}
                        ref={ref}
                    />
                </div>
                <div className="h-[30rem] w-full custom-scrollbar overflow-y-auto bg-base-100 px-3 py-2">
                    <div className='markdown max-w-[85ch]'>
                        <Markdown>
                            {text}
                        </Markdown>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MarkdownEditor