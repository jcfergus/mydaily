interface DividerProps {}

export default function Divider({}: DividerProps): JSX.Element {
    return (
        <hr className="my-6 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-25 dark:opacity-100"
            />
    )
}