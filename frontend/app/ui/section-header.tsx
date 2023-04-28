
interface SectionHeaderProps {
   title: string;
   children?: string | React.ReactNode | Array<React.ReactNode>;
}

export default function SectionHeader({title, children}: SectionHeaderProps): JSX.Element {
    return (
        <div className="flex flex-row">
            <div className="text-xl p-2 w-[12rem] max-w-[12rem] min-w-[12rem]">
                {title}
            </div>
            <div className="p-2 flex-grow">
                <span className="italic text-sm">{children}</span>
            </div>
        </div>
    )
}