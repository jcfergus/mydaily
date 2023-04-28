import UserAvatar from "@/app/user/user-avatar";
import React, {useEffect, useRef, useState} from "react";
import { useAppDispatch } from "@/app/hooks";
import {showDialog} from "@/app/store/uiSlice";

interface LoggedInMenuProps {
    user: any;
}

export default function LoggedInMenu({user}: LoggedInMenuProps): JSX.Element {
    const dispatch = useAppDispatch();
    const avatar = React.createRef<HTMLDivElement>()

    const [showMenu, setShowMenu] = useState<boolean>(false);

    useEffect(() => {
        if (avatar.current) {
            avatar.current.onclick = () => {
                setShowMenu(!showMenu)
            }
        }
    })

    return (
        <>
            <UserAvatar ref={avatar} />

            <div className={
                `z-[999] top-0 left-0 bottom-0 right-0 fixed
                bg-transparent
                ${showMenu ? "visible" : "invisible"}`}
                 onClick={() => setShowMenu(false)}></div>

            <div className={`z-[1000] top-12 right-12
                flex flex-col
                border-2 border-orange-500
                bg-white
                p-0 m-2
                fixed
                drop-shadow-md
                width-[24em] 
                ${showMenu ? "visible" : "invisible"}`}>
                <div className="m-0 p-2 bg-orange-300">Main Menu</div>
                <div className="m-0 p-2 hover:bg-orange-500 hover:text-white"
                     onClick={() => { dispatch(showDialog("feedsDialog")) && setShowMenu(false)}}
                    >Feeds</div>
                <div
                    className="m-0 p-2 hover:bg-orange-500 hover:text-white"
                    onClick={() => { dispatch(showDialog("settingsDialog")) && setShowMenu(false)}}
                    >Settings</div>
                <div
                    className="m-0 p-2 hover:bg-orange-500 hover:text-white"
                    onClick={() => { dispatch(showDialog("profileDialog")) && setShowMenu(false)}}
                >Profile</div>
                <div className=""></div>
                <div className="m-0 p-2 hover:bg-orange-500 hover:text-white">Log Out</div>
            </div>
        </>
    );
}