import { CodeBracketIcon, EyeIcon, FaceSmileIcon, QuestionMarkCircleIcon, Square2StackIcon } from '@heroicons/react/24/outline';
import { PencilIcon } from '@heroicons/react/24/solid';
import { useEmojiStore } from '@src/store';
import classNames from 'classnames';
import { useRef, useState } from 'react';
import Markdown from 'react-markdown'
import useUndoable from 'use-undoable';
import { Tooltip } from 'react-tooltip'

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
    const { open, toogleOpen } = useEmojiStore();
    const [mode, setMode] = useState<Mode>(Mode.CODE_AND_PREVIEW);
    const ref = useRef<HTMLTextAreaElement>(null);
    const [text, setText, { undo, redo }] = useUndoable(props.value)

    const handleTextClick = ({
        startWith,
        endWith
    }: {
        startWith: string,
        endWith?: string
    }) => {
        const textarea = ref.current;
        if (!textarea) return;

        const startPos = textarea.selectionStart || 0;
        const endPos = textarea.selectionEnd || 0;
        const selectedText = textarea.value.substring(startPos, endPos);

        const checkStartPos = textarea.selectionStart - startWith.length
        const checkEndPos = textarea.selectionEnd + (endWith ? endWith.length : 0)
        const checkSelectedText = textarea.value.substring(checkStartPos, checkEndPos);
        const formatted = checkSelectedText.startsWith(startWith) && (endWith ? checkSelectedText.endsWith(endWith) : true);

        if (!formatted) {
            const newText = `${startWith}${selectedText}${endWith ?? ""}`;
            const updatedText =
                textarea.value.substring(0, startPos) +
                newText +
                textarea.value.substring(endPos);

            handleTextChange(updatedText);

            setTimeout(function () {
                const newCursorPos = startPos + newText.length;
                textarea.focus();
                textarea.setSelectionRange(newCursorPos, newCursorPos);
            }, 0);
        } else {
            const newText = `${selectedText}`;
            const updatedText =
                textarea.value.substring(0, checkStartPos) +
                newText +
                textarea.value.substring(checkEndPos);

            handleTextChange(updatedText);

            setTimeout(function () {
                const newCursorPos = checkStartPos;
                textarea.focus();
                textarea.setSelectionRange(newCursorPos, newCursorPos);
            }, 0);
        }

    };

    const handleTextChange = (val: string) => {
        props.setValue(val)
        setText(val)
    }

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
            <div className="border-b border-base-300 flex items-center w-full px-2">
                <p className='font-semibold text-sm'>
                    {props.title}
                    <button className="btn btn-xs" onClick={() => handleTextClick({
                        startWith: "**",
                        endWith: "**"
                    })}>Bold</button>

                    <button className="btn btn-xs" onClick={() => handleTextClick({
                        startWith: "## "
                    })}>S Bold</button>

                    <button className="btn btn-xs" onClick={undo}>Undo</button>

                    <button className="btn btn-xs" onClick={redo}>Redo</button>
                </p>
                <div className="ml-auto flex space-x-3 py-2">
                    <RightSideToolbar />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-1 divide-x divide-base-300">
                <div className='flex'>
                    <textarea
                        className="h-[30rem] custom-scrollbar overflow-y-auto textarea placeholder:text-base text-base w-full resize-none rounded-none"
                        value={text}
                        onChange={e => handleTextChange(e.target.value)}
                        placeholder={props.placeholder}
                        ref={ref}
                    />
                </div>
                <div className="h-[30rem] w-full custom-scrollbar overflow-y-auto bg-base-100 px-3 py-2">
                    <div className='markdown'>
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