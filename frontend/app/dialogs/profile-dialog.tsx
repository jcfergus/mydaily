import Dialog from "@/app/ui/dialog";
import {hideDialog, selectProfileDialog} from "@/app/store/uiSlice";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import React from "react";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import GeneralTab from "@/app/profile/general-tab";
import AboutYouTab from "@/app/profile/about-you-tab";

import { useGetUserByIdQuery } from "@/app/store/api/graphql/user.generated";
import {selectUser} from "@/app/store/authenticationSlice";

interface ProfileDialogProps {
}

export default function ProfileDialog({}: ProfileDialogProps): JSX.Element {
    const dispatch = useAppDispatch();

    const user = useAppSelector(selectUser);

    const { data, isLoading } = useGetUserByIdQuery({id: user?.id})

    return (
        <Dialog
            fullScreen={true}
            isOpen={useAppSelector(selectProfileDialog)}
            onClose={() => dispatch(hideDialog("profileDialog"))}
            ok={false} cancel="Close"
            title={"User Profile"}
        >
            <Tabs className="w-full h-full max-h-full">
                <TabList>
                    <Tab>General</Tab>
                    <Tab>About You</Tab>
                </TabList>
                <TabPanel className="w-full h-full pb-[10rem] overflow-auto">
                    <GeneralTab profile={data?.user ?? undefined} />
                </TabPanel>
                <TabPanel className="w-full h-full pb-[10rem] overflow-auto">
                    <AboutYouTab profile={data?.user ?? undefined} />
                </TabPanel>
            </Tabs>
        </Dialog>
    )
}