'use client';

import React, {ChangeEvent, ChangeEventHandler, useEffect, useRef, useState} from "react";
import Dialog from "@/app/ui/dialog";

const formDefaults = {
    email: "",
    password: "",
    confirm: "",
};

import {useSupabase} from "@/app/supabase-provider";

interface SignupDialogProps {
    isOpen: boolean;
}

export default function SignupDialog({isOpen}: SignupDialogProps): JSX.Element {
    const {supabase} = useSupabase();

    const [formState, setFormState] = useState<{ email?: string, password?: string, confirm?: string }>(formDefaults);
    const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);

    useEffect(() => {
        setDialogIsOpen(isOpen);
    }, [isOpen]);

    const onCancel = (): void => {
        setDialogIsOpen(false);
    };

    const onOk = async (): Promise<void> => {
        if (!formState.email || !formState.password) {
            return;
        }

        const {data, error} = await supabase.auth.signUp({
            email: formState.email,
            password: formState.password,
        });

        setDialogIsOpen(false);
    }

    const validateForm = (ev: ChangeEvent<HTMLInputElement>): boolean => {
        if ( !!formState.password && !!formState.confirm
            && formState.password !== formState.confirm ) {
            (document.getElementById("confirm") as HTMLInputElement)
                .setCustomValidity("Password and password confirmation must match.");
            return false;
        }
        return true;
    }

    const updateFormState = (ev: ChangeEvent<HTMLInputElement>) => {
        setFormState({...formState, [ev.target.id]: ev.target.value});
        if (validateForm(ev)) {

        }
    }

    return (
        <Dialog
            isOpen={dialogIsOpen}
            onCancel={onCancel}
            onClose={onCancel}
            onOk={onOk}
            title="Sign up to customize YOUR daily!"
            ok="Sign Up"
            cancel={true}
        >
            <form>
                <div className="flex flex-row justify-end my-1 items-center">
                    <label htmlFor="email" className="pr-2">
                        Enter your email address:
                    </label>
                    <input
                        className="rounded-sm valid:border-green-500"
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
                <div className="flex flex-row justify-end my-1 items-center">
                    <label htmlFor="confirm" className="pr-2">
                        Confirm password:
                    </label>
                    <input
                        className="rounded-sm valid:border-green-500"
                        type="password"
                        required
                        minLength={12}
                        id="confirm"
                        name="confirmPassword"
                        onChange={updateFormState}
                        value={formState.confirm}
                    />
                </div>
            </form>
        </Dialog>
    )
}