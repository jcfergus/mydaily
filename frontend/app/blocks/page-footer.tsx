import { Roboto_Condensed } from "next/font/google";
import {useAppSelector} from "@/app/hooks";
import {selectUser} from "@/app/store/authenticationSlice";

const textFont = Roboto_Condensed({subsets: ["latin"], weight: "400" })

interface PageFooterProps {
}

export default function PageFooter({ }: PageFooterProps): JSX.Element {
    const user = useAppSelector(selectUser);

    return (
        <div className={`${textFont.className} full-width border-t-2 border-black text-center px-4`}>
            <strong>{user ? `${user.givenName}'s` : "Your"}</strong> daily news source.
        </div>
    )
}