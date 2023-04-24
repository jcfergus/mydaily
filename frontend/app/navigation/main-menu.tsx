import LoggedInMenu from "./logged-in-menu";
import LoginSignupButtons from "@/app/navigation/login-signup-buttons";
import { useAppSelector } from "@/app/hooks";
import { selectUser } from "@/app/store/authenticationSlice";

interface MainMenuProps {}

export default function MainMenu({}: MainMenuProps) {
    const user = useAppSelector(selectUser);
    return (
        <div className="fixed block top-0 right-0">
            { user ? <LoggedInMenu user={user} /> : <LoginSignupButtons /> }
        </div>
    )
}