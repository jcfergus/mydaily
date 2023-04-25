'use client';

import React, {ChangeEvent, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import Dialog from "@/app/ui/dialog";

import {useSignUpMutation} from "@/app/store/api/authentication";
import type {SignUpRequest} from "@/app/store/api/authentication";

import toast from "react-hot-toast";

interface FormState {
    email?: string;
    password?: string;
    confirm?: string;
    givenName?: string;
    surname?: string;
}

const formDefaults = {
    email: "",
    password: "",
    confirm: "",
    givenName: "",
    surname: "",
};

interface SignupDialogProps {
    isOpen: boolean;
    onCancel?: () => void;
    onOk?: () => void;
}

export default function SignupDialog({isOpen, onCancel: parentOnCancel, onOk: parentOnOk}: SignupDialogProps): JSX.Element {
    const [formState, setFormState] = useState<FormState>(formDefaults);
    const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
    const [signUp, {isLoading}] = useSignUpMutation();
    const router = useRouter();

    useEffect(() => {
        setDialogIsOpen(isOpen);
    }, [isOpen]);

    const onCancel = (): void => {
        setFormState(formDefaults);
        !!parentOnCancel && parentOnCancel();
    };

    const onOk = async (): Promise<void> => {
        if (!formState.email || !formState.password) {
            toast("Please enter an email address and a password.");
            return;
        }

        const signUpRequest: SignUpRequest = {
            email: formState.email,
            password: formState.password,
            givenName: formState.givenName,
            surname: formState.surname,
        }

        try {
            await signUp(signUpRequest).unwrap();
            router.push("/");
        } catch (err: any) {
            console.log(err);
            toast(`An error occurred: ${err.message}`)
        }

        !!parentOnOk && parentOnOk();
    }

    const validateForm = (ev: ChangeEvent<HTMLInputElement>): boolean => {
        if (!!formState.password && !!formState.confirm
            && formState.password !== formState.confirm) {
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
                        Enter your e-mail address:
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
                    <label htmlFor="givenName" className="pr-2">
                        First (given) name:
                    </label>
                    <input
                        className="rounded-sm valid:border-green-500"
                        type="text"
                        id="givenName"
                        name="givenName"
                        onChange={updateFormState}
                        value={formState.givenName}
                    />
                </div>
                <div className="flex flex-row justify-end my-1 items-center">
                    <label htmlFor="surname" className="pr-2">
                        Last (family) name:
                    </label>
                    <input className={"rounded-sm valid:border-green-500"}
                           type={"text"}
                           id={"surname"}
                           name={"surname"}
                           onChange={updateFormState}
                           value={formState.surname}
                    />
                </div>
                <div className="flex flex-row justify-end my-1 items-center">
                    <label htmlFor="password" className="pr-2">
                        Enter a password:
                    </label>
                    <input className="rounded-sm valid:border-green-500"
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