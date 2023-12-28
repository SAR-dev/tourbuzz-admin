import { ReactNode } from 'react';

const PageHeader = ({
    title,
    subtitle,
    right
}: {
    title: string,
    subtitle: string,
    right: ReactNode
}) => {
    return (
        <div className="card flex-row items-center justify-between p-5 bg-base-200">
            <div className="text-left">
                <h1 className="font-semibold text-2xl">{title}</h1>
                <p className="mt-1.5 text-sm">{subtitle}</p>
            </div>

            <div className="flex flex-row items-center">
                {right}
            </div>
        </div>
    )
}

export default PageHeader