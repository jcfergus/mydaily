import Image from "next/image";
import User from "@/lib/models/user";

import { Alegreya_SC } from "next/font/google";

const initialsFont = Alegreya_SC({subsets: ["latin"], weight: "500"})

interface UserAvatarProps {
    user?: User;
}

export default function UserAvatar({user}: UserAvatarProps): JSX.Element {
    if (user?.avatarUrl) {
        return (
            <Image className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src={user.avatarUrl} alt="User Avatar"/>
            );
    }

    return (
        <div className={`${initialsFont.className} inline-block h-16 min-h-16 w-16 min-w-16 rounded-full ring-2 ring-white bg-orange-500 text-white`}>JF</div>
    )
}