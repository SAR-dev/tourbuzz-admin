import Markdown from 'markdown-to-jsx'
import { useRef } from 'react';
import rehypeSanitize from "rehype-sanitize";

interface MarkdownEditorType {
    value: string;
    setValue: (props: string) => void;
    placeholder?: string;
}

const MarkdownEditor = ({ ...props }: MarkdownEditorType) => {
    return (
        <div className="border border-base-300 w-full">
            <div className="grid grid-cols-2 gap-1 divide-x divide-base-300">
                <div>
                    <textarea
                        className="h-[30rem] custom-scrollbar overflow-y-auto textarea placeholder:text-base text-base w-full"
                        value={props.value}
                        onChange={e => props.setValue(e.target.value)}
                        placeholder={props.placeholder}
                    />
                </div>
                <div className="h-[30rem] w-full custom-scrollbar overflow-y-auto bg-base-100 px-3 py-2">
                    <div className='prose prose-headings:text-xl [&>p:first-child]:mt-0'>
                        <Markdown options={{ wrapper: 'article' }}>
                            {props.value}
                        </Markdown>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MarkdownEditor