'use client'

import SignupDialog from "@/app/authentication/signup-dialog";
import LoginDialog from "@/app/authentication/login-dialog";
import {useState} from "react";

export default function LoginSignupButtons() {
    const [ signupIsOpen, setSignupIsOpen ] = useState<boolean>(false);
    const [ loginIsOpen, setLoginIsOpen ] = useState<boolean>(false);

    return (
        <div className="flex flex-col pt-2 pr-2 items-end">
            <button
                className="
                    bg-orange-500
                    hover:bg-orange-800
                    border-white
                    border-2
                    rounded-md
                    p-2
                    my-1
                    mx-1
                    text-white
                    drop-shadow-md
                    w-[10em]
                    h-[5em]"
                onClick={() => { setLoginIsOpen(false); setSignupIsOpen(true) } }
            >
                Sign Up
            </button>
            <SignupDialog
                isOpen={signupIsOpen}
                onCancel={() => setSignupIsOpen(false)}
                onOk={() => setSignupIsOpen(false)}
            />
            <button
                className="
                    text-orange-500
                    hover:bg-gray-200
                    bg-white
                    border-orange-500
                    border-2
                    rounded-md
                    p-2
                    my-1
                    mx-1
                    drop-shadow-md
                    w-[7em]"
                onClick={() => { setSignupIsOpen(false); setLoginIsOpen(true) } }>
                Log In
            </button>
            <LoginDialog
                isOpen={loginIsOpen}
                onCancel={() => setLoginIsOpen(false)}
                onOk={() => setLoginIsOpen(false)}
            />
        </div>
    )
}