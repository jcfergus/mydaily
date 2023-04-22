import React, {useEffect, useRef} from "react";

interface DialogProps {
    isOpen: boolean;
    onOk?: () => void;
    onClose?: () => void;
    onCancel?: () => void;
    title?: string;
    children: React.ReactNode;
    ok: string | boolean;
    cancel: string | boolean;
}

export default function Dialog({
                                   isOpen,
                                   onOk,
                                   onClose,
                                   onCancel,
                                   title,
                                   children,
                                   ok = true,
                                   cancel = true
                               }: DialogProps): JSX.Element {
    const ref = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (isOpen) {
            ref.current?.showModal();
            document.body.classList.add("modal-open");
        } else {
            ref.current?.close();
            document.body.classList.remove("modal-open");
        }
    }, [isOpen]);

    const okAndClose = () => {
        onOk && onOk();
        onClose && onClose();
    };

    const cancelAndClose = () => {
        onCancel && onCancel();
        onClose && onClose();
    }

    const preventAutoClose = (e: React.MouseEvent) => e.stopPropagation();

    return (
        <dialog className="backdrop:backdrop-blur border-orange-500 border-2 rounded-md p-0"
                id="dialog"
                ref={ref}
                onCancel={onClose}
                onClick={onClose}>
            <div className="flex flex-col" onClick={preventAutoClose}>
                <div className="bg-orange-500 text-white font-bold m-0 p-4">{title}</div>
                <div className="p-4">{children}</div>
                <div className="flex flex-row justify-end m-0 p-2 bg-orange-300">
                    {
                        cancel ? (
                            <button className="bg-white border-orange-500 border-2 rounded-sm p-2 m-1"
                                    onClick={cancelAndClose}>
                                {typeof cancel === "string" ? cancel : "Cancel"}
                            </button>
                        ) : (
                            <></>
                        )
                    }
                    {
                        ok ? (
                            <button className="bg-orange-500 text-white border-white border-2 rounded-sm p-2 m-1"
                                   onClick={okAndClose}>
                                {typeof ok === "string" ? ok : "OK"}
                            </button>
                        ) : (
                            <></>
                        )
                    }
                </div>
            </div>
        </dialog>
    )
}