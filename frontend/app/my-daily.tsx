'use client'

import PageHeader from "@/app/blocks/page-header";
import PageContent from "@/app/blocks/page-content";
import PageFooter from "@/app/blocks/page-footer";
import MainMenu from "@/app/navigation/main-menu";
import { store } from "@/app/store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import { useRefreshQuery } from "@/app/store/api/authentication";
import {useEffect} from "react";

interface MyDailyProps { }

export default function MyDaily({}: MyDailyProps): JSX.Element {

    return (
        <>
            <Provider store={store}>
                <MainMenu />
                <div className="container flex flex-col bg-white h-full grow">
                    <PageHeader/>
                    <div className="flex grow">
                        <PageContent/>
                    </div>

                    <PageFooter />
                </div>
                <Toaster />
            </Provider>
        </>
    )
};