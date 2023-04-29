import LoggedInMenu from "./logged-in-menu";
import LoginSignupButtons from "@/app/navigation/login-signup-buttons";
import {useAppSelector} from "@/app/hooks";
import {selectUser} from "@/app/store/authenticationSlice";
import {useRefreshQuery} from "@/app/store/api/authentication";

interface MainMenuProps {
}

export default function MainMenu({}: MainMenuProps) {
    const user = useAppSelector(selectUser);

    // This triggers a call to the refresh endpoint when the page first loads,
    // to get a fresh JWT if needed.
    const { data: refresh } = useRefreshQuery(undefined, {skip: false});

    return (
        <>
            { !!user || <div
                className="fixed block
                    top-0 right-0
                    width-[0px]
                    height-[0px]
                    border-r-orange-500
                    border-r-[20em]
                    border-b-transparent
                    border-b-[20em]
                    drop-shadow-lg"
            ></div> }
            <div className="fixed block top-0 right-0">
                {user ? <LoggedInMenu user={user}/> : <LoginSignupButtons/>}
            </div>
        </>
    )
}