import {User} from "@supabase/gotrue-js";

import PageHeader from "@/app/blocks/page-header";
import PageContent from "@/app/blocks/page-content";
import PageFooter from "@/app/blocks/page-footer";
import MainMenu from "@/app/navigation/main-menu";

interface MyDailyProps {
    user?: User,
}

export default function MyDaily({user}: MyDailyProps): JSX.Element {
    return (
        <>
            <MainMenu user={undefined}/>
            <div className="container flex flex-col bg-white h-full grow">
                <PageHeader/>
                <div className="flex grow">
                    <PageContent/>
                </div>
                <PageFooter/>
            </div>
        </>
    )
};