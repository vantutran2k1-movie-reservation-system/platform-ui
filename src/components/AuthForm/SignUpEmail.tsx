import "./AuthForm.css";
import React, {useEffect, useState} from "react";
import {checkUserExistsByEmail} from "../../api/Auth.ts";
import {validateEmailForSignUp} from "./AuthValidator.ts";
import {useFormContext} from "./SignInFormContext.tsx";

export default function SignUpEmail() {
    const {updateFieldState} = useFormContext();

    const [email, setEmail] = useState<string>("");
    const [emailError, setEmailError] = useState<string | null>(null);

    const [checkUserExistsLoading, setCheckUserExistsLoading] = useState<boolean>(false);
    const [userExists, setUserExists] = useState<boolean | null>(null);
    const [debouncedEmail, setDebouncedEmail] = useState<string>("");
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedEmail(email);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [email]);
    useEffect(() => {
        if (!debouncedEmail) {
            setUserExists(null);
            return;
        }

        setCheckUserExistsLoading(true);
        checkUserExistsByEmail(debouncedEmail)
            .then((data) => {
                const userExists: boolean = data.data;
                setUserExists(userExists);
            })
            .catch(() => {
                setUserExists(null);
            })
            .finally(() => {
                setCheckUserExistsLoading(false);
            });
    }, [debouncedEmail]);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        setEmailError(validateEmailForSignUp(value, userExists));
    };
    const isEmailValid = email !== "" && emailError === null;
}