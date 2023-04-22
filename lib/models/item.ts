export default interface Item {
    type: "brief" | "long";
    id: string;
    title: string;
    text: string;
}