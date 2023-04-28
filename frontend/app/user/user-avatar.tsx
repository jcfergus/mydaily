import Image from "next/image";
import User from "@/lib/models/user";

import {Alegreya_SC} from "next/font/google";
import React, {ForwardedRef} from "react";

const initialsFont = Alegreya_SC({subsets: ["latin"], weight: "500"})

interface UserAvatarProps {
    user?: User;
}

export default React.forwardRef(function UserAvatar(props: UserAvatarProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
    return (
        <div title={"Main Menu"} ref={ref} className="inline-block">
            {props.user?.avatarUrl ?
                (
                    <Image className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src={props.user.avatarUrl}
                           alt="User Avatar"/>
                ) : (
                    <div className={
                        `${initialsFont.className} 
                        inline-block 
                        drop-shadow-lg
                        cursor-pointer
                        h-16 min-h-16 w-16 min-w-16 
                        rounded-full 
                        ring-2 ring-white 
                        bg-orange-500 
                        text-white 
                        text-center
                        text-3xl
                        py-3
                        m-2`}
                    >JF</div>
                )
            }
        </div>
    )
});