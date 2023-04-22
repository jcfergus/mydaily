import Image from "next/image";

interface LoggedInMenuProps {
    user: any;
}

export default function loggedInMenu({user}: LoggedInMenuProps): JSX.Element {
    return (
        <Image className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src={user.avatarHtml} alt="User Avatar"/>
    );
}