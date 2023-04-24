'use client';
import React, {ChangeEvent, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import Dialog from "@/app/ui/dialog";

import {useLogInMutation} from "@/app/store/api/authentication";
import type {LoginRequest} from "@/app/store/api/authentication";

interface FormState {
    email?: string;
    password?: string;
}

const formDefaults = {
    email: "",
    password: ""
};

interface LoginDialogProps {
    isOpen: boolean;
}

export default function LoginDialog({isOpen}: LoginDialogProps): JSX.Element {
    const [formState, setFormState] = useState<FormState>(formDefaults);
    const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
    const [logIn, {isLoading}] = useLogInMutation();
    const router = useRouter();

    useEffect(() => {
        setDialogIsOpen(isOpen);
    }, [isOpen]);

    const onCancel = (): void => {
        setFormState({});
        setDialogIsOpen(false);
    }

    const onOk = async (): Promise<void> => {
        if (!formState.email || !formState.password) {
            // XXX
            return;
        }

        const loginRequest: LoginRequest = {
            email: formState.email,
            password: formState.password,
        }

        try {
            await logIn(loginRequest).unwrap();
            router.push("/");
        } catch (err) {
            // XXX
        } finally {
            setDialogIsOpen(false);
        }
    }

    const updateFormState = (ev: ChangeEvent<HTMLInputElement>) => {
        setFormState({...formState, [ev.target.id]: ev.target.value});
    }

    return (
        <Dialog isOpen={dialogIsOpen}
                onCancel={onCancel}
                onClose={onCancel}
                onOk={onOk}
                title="Log in for YOUR custom Daily!"
                ok={"Log In"}
                cancel={true}>
            <form>
                <div className="flex flex-row justify-end my-1 items-center">
                    <label htmlFor="email" className="pr-2">
                        Enter your e-mail address:
                    </label>
                    <input className="rounded-sm valid:border-green-500"
                           type="email"
                           required
                           minLength={5}
                           maxLength={50}
                           id="email"
                           name="emailAddress"
                           onChange={updateFormState}
                           value={formState.email}
                    />
                </div>
                <div className="flex flex-row justify-end my-1 items-center">
                    <label htmlFor="password" className="pr-2">
                        Enter a password:
                    </label>
                    <input
                        className="rounded-sm valid:border-green-500"
                        type="password"
                        required
                        minLength={12}
                        id="password"
                        name="password"
                        onChange={updateFormState}
                        value={formState.password}
                    />
                </div>
            </form>
        </Dialog>

    )
}