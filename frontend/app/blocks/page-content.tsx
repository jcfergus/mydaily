import { Old_Standard_TT } from "next/font/google";

const bodyFont = Old_Standard_TT({weight: "400", subsets: ["latin"]})

interface PageContentProps {

}

export default function PageContent({}: PageContentProps): JSX.Element {
    return (
        <div className={`${bodyFont.className} text-sm grid grid-cols-6 gap-4 h-20 grow`}>
            <div className="p-2">Stuff</div>
            <div className="p-2">More Stuff</div>
            <div className="col-span-3 p-2">Other Stuff</div>
            <div className="p-2">More More More Stuff</div>
        </div>
    )
}