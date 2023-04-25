import Image from "next/image";
import UserAvatar from "@/app/user/user-avatar";

interface LoggedInMenuProps {
    user: any;
}

export default function loggedInMenu({user}: LoggedInMenuProps): JSX.Element {
    return (
        <UserAvatar />
    );
}