import AvatarEditor from "@/app/profile/avatar-editor";
import EditableInput from "@/app/ui/editable-input";
import Divider from "@/app/ui/divider";
import PasswordInput from "@/app/ui/password-input";
import SectionHeader from "@/app/ui/section-header";
import {useEffect} from "react";

interface GeneralTabProperties {
}

export default function GeneralTab({}: GeneralTabProperties): JSX.Element {
    useEffect(() => {

    })

    const save = (fieldName: string, value: string | number) => {

    }

    return (
        <div className="w-full flex flex-col overflow-auto">
            <div className="flex w-full flex-row flex-auto h-64">
                <div className="w-[50%] p-2">
                    <AvatarEditor/>
                </div>
                <div className="w-[50%] p-2">
                    Some other stuff
                </div>
            </div>
            <div className="flex-wrap flex-grow">
                <div className="flex flex-col">
                    <Divider />

                    <SectionHeader title={"The Basics"}>
                        <span className="italic text-sm">The basics of who you are.  Currently only visible
                            to you.  If it&apos;s ever going to be shared, we&apos;ll ask you to opt in.</span>
                    </SectionHeader>

                    <EditableInput onSave={save} label={"Given (First) Name"} fieldName="givenName"/>
                    <EditableInput onSave={save} label={"Family (Last) Name"} fieldName="surname"/>
                    <EditableInput onSave={save} label={"Username/Alias"} fieldName="alias"/>

                    <Divider/>

                    <SectionHeader title={"Security"}>
                        <span className="italic text-sm">How you log in.  This will never be shared with anyone else.</span>
                    </SectionHeader>

                    <EditableInput onSave={save} label={"E-Mail Address"} fieldName="email"/>
                    <PasswordInput onSave={save} fieldName={"password"} label={"Password"}/>
                </div>
            </div>
        </div>
    )
}
