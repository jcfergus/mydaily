import React from "react";
import BriefItem from "@/lib/models/brief-item";

import {FaLink} from "react-icons/all";

interface BriefItemProps {
    item: BriefItem;
}

export default function BriefItemBlock({item}: BriefItemProps): JSX.Element {
    return (
        <div className="border-2 border-black">
            <h3>{item.title} <FaLink /></h3>
            <p>{item.text}</p>
        </div>
    )
}