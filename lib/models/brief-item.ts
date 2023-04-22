import Item from "@/lib/models/item";

export default interface BriefItem extends Item {
    type: "brief";
    title: string;
    link: string;
    source: string;
}