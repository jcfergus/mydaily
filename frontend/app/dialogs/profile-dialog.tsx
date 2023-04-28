import Dialog from "@/app/ui/dialog";
import {hideDialog, selectProfileDialog} from "@/app/store/uiSlice";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import React from "react";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import GeneralTab from "@/app/profile/general-tab";
import AboutYouTab from "@/app/profile/about-you-tab";

interface ProfileDialogProps {
}

export default function ProfileDialog({}: ProfileDialogProps): JSX.Element {
    const dispatch = useAppDispatch();
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
                    <GeneralTab />
                </TabPanel>
                <TabPanel className="w-full h-full pb-[10rem] overflow-auto">
                    <AboutYouTab />
                </TabPanel>
            </Tabs>
        </Dialog>
    )
}