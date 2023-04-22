'use client'

import SignupDialog from "@/app/authentication/signup-dialog";
import {useState} from "react";

export default function LoginSignupButtons() {
    const [ signupIsOpen, setSignupIsOpen ] = useState<boolean>(false);

    return (
        <div className="flex flex-col pt-2 pr-2">
            <button
                className="bg-orange-500 hover:bg-orange-800 border-white border-2 rounded p-2 my-1 mx-1 text-white drop-shadow"
                onClick={() => setSignupIsOpen(true)}
            >
                Sign Up
            </button>
            <SignupDialog isOpen={signupIsOpen}/>
            <button className="text-orange-500 hover:bg-gray-200 bg-white border-orange-500 border-orange-500 border-2 rounded p-2 my-1 mx-1 drop-shadow">
                Log In
            </button>
        </div>
    )
}