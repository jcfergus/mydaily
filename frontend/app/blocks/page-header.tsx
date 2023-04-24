import { Alegreya_SC, Roboto_Condensed } from "next/font/google";

const bigHeadFont /* and the Monsters */ = Alegreya_SC({subsets: ['latin'], weight: "400"});
const robotoCondensed = Roboto_Condensed({subsets: ['latin'], weight: "400"});

export default function PageHeader(): JSX.Element {
    return (
        <div className="flex full-width justify-center flex-col">
            <div className="full-width">
                <p className={`${bigHeadFont.className} text-center leading-tight [font-size:120pt] font-bold`}>MyDaily</p>
            </div>
            <div className={`${robotoCondensed.className} columns-3 border-black border-t-2 border-b-2 px-4`}>
                <div className="w-full">
                    {new Date().toDateString()}
                </div>
                <div className="w-full text-center">
                    Morning Edition
                </div>
                <div className="w-full text-right">
                    Free
                </div>
            </div>
        </div>
    )

}