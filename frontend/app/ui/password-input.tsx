import {MdCheck, MdClose} from "react-icons/md";
import {ChangeEvent, useEffect, useState} from "react";
import toast from "react-hot-toast";

interface PasswordInputProps {
    fieldName: string;
    label: string;
    minLength?: number;
    maxLength?: number;
    required?: boolean;
    value?: string;
    onSave?: (fieldName: string, value: string | number) => void;
}

export default function PasswordInput({
                                          fieldName,
                                          label,
                                          onSave,
                                          value = "",
                                          required = false,
                                          minLength = 10,
                                          maxLength = undefined
                                      }: PasswordInputProps): JSX.Element {
    const [isActive, setActive] = useState<boolean>(false);
    const [isDirty, setDirty] = useState<boolean>(false);
    const [currentValue, setCurrentValue] = useState<string>(value);

    useEffect(() => {
        if (currentValue !== value) {
            setDirty(true);
        }
    }, [currentValue, value])

    const handleReset = () => {
        setCurrentValue(value);
        setDirty(false);
    }

    const handleSave = () => {
        try {
            onSave && onSave(fieldName, currentValue);
        } catch (error: any) {
            toast("Error saving new password. Please try again.");
        }
    }

    const change = (ev: ChangeEvent<HTMLInputElement>) => {
        setCurrentValue(ev.target.value);
    }

    const focus = () => {
        setActive(true);
    }

    const unfocus = () => {
        setActive(false);
    }

    const cancel = () => {
        setDirty(false);
    }

    return (
        <>
            <div className="flex flex-row justify-end my-1 items-center py-2">
                <label htmlFor={fieldName} className="pr-2 w-64 text-end">
                    <span className="font-bold">{label}</span>
                </label>

                <input className={`
                        ${isActive || isDirty ? "valid:border-green-500" : ""}
                        flex-grow
                        rounded-sm
                        mr-2`}
                       type="password"
                       required={required}
                       minLength={minLength}
                       maxLength={maxLength}
                       id={fieldName}
                       value={currentValue}
                       onFocus={focus}
                       onBlur={unfocus}
                       onChange={change}
                       name={fieldName}/>

                <div className="w-8">&nbsp;</div>
                <div className="w-8">&nbsp;</div>
            </div>

            <div className="flex flex-row justify-end my-1 items-center py-2">
                <label htmlFor={fieldName} className="pr-2 w-64 text-end">
                    <span className="font-bold">{label} confirm</span>
                </label>

                <input className={`
                        ${isActive || isDirty ? "valid:border-green-500" : ""}
                        flex-grow
                        rounded-sm
                        mr-2`}
                       type="password"
                       required={required}
                       minLength={minLength}
                       maxLength={maxLength}
                       id={fieldName}
                       value={currentValue}
                       onFocus={focus}
                       onBlur={unfocus}
                       onChange={change}
                       name={`${fieldName}-confirm`}/>

                <button
                    className={`rounded-full ${isActive || isDirty ? "bg-green-700" : "bg-gray-300"} p-1 m-1 text-white`}>
                    <MdCheck/></button>
                <button
                    className={`rounded-full ${isActive || isDirty ? "bg-red-700" : "bg-gray-300"} p-1 m-1 text-white`}>
                    <MdClose/></button>
            </div>
        </>
    )
}