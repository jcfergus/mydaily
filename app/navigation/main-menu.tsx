import LoggedInMenu from "./logged-in-menu";
import LoginSignupButtons from "@/app/navigation/login-signup-buttons";

interface MainMenuProps {
    user: any;
}
export default function MainMenu({user}: MainMenuProps) {
    return (
        <div className="fixed block top-0 right-0">
            { user ? <LoggedInMenu user={user} /> : <LoginSignupButtons /> }
        </div>
    )
}