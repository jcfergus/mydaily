import { Roboto_Condensed } from "next/font/google";

const textFont = Roboto_Condensed({subsets: ["latin"], weight: "400" })

interface PageFooterProps {
    user: any;
}

export default function PageFooter({ user }: PageFooterProps): JSX.Element {
    return (
        <div className={`${textFont.className} full-width border-t-2 border-black text-center px-4`}>
            <strong>{user ? user.name : "Your"}</strong> daily news source.
        </div>
    )
}