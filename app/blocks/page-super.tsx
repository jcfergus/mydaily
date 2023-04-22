import BriefItemBlock from "./items/brief-item-block";
import BriefItem from "@/lib/models/brief-item";

interface PageSuperProps {
    superItems?: Array<BriefItem>;
}

export default function PageSuper({superItems}: PageSuperProps): JSX.Element {
    return superItems && superItems.length > 0 ?
        (
            <div className="columns-3">
                {superItems.map((item) => {
                    return (
                        <BriefItemBlock item={item} key={item.id}/>
                    )
                })
                }
            </div>
        ) :
        (<></>)
        ;
}