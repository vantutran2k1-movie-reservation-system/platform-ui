import React, {useState} from "react";
import "../AuthForm.css";
import {
    validateConfirmPassword,
    validateDateOfBirth,
    validateEmail,
    validateFirstName,
    validateLastName,
    validatePhoneNumber,
    validateSignUpPassword,
} from "../AuthValidator.ts";
import {Alert} from "@mui/material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import {LoadingButton} from "@mui/lab";
import {signUp} from "../../../api/Auth.ts";
import SignUpEmail from "./SignUpEmail.tsx";
import SignUpPassword from "./SignUpPassword.tsx";
import SignUpConfirmPassword from "./SignUpConfirmPassword.tsx";
import SignUpFirstName from "./SignUpFirstName.tsx";
import SignUpLastName from "./SignUpLastName.tsx";
import SignUpPhoneNumber from "./SignUpPhoneNumber.tsx";
import SignUpDateOfBirth from "./SignUpDateOfBirth.tsx";
import {useSignUpFormContext} from "./SignUpContext.tsx";

export default function SignUpForm() {
    const {
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        dateOfBirth,
        isFormValid,
    } = useSignUpFormContext();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsLoading(true);
        await signUp({
            email: email.value,
            password: password.value,
            firstName: firstName.value,
            lastName: lastName.value,
            phoneNumber: phoneNumber.value,
            dateOfBirth: dateOfBirth.value,
        })
            .then(() => {
                setIsSuccess(true);
            })
            .catch(() => {
                setIsSuccess(false);
            }).finally(() => {
                setIsLoading(false);
            });
    };

    const signUpAlert = () => {
        if (isSuccess !== null && !isSuccess) {
            return <Alert severity="error">An error occurred. Please try again.</Alert>;
        }

        if (isSuccess) {
            return <Alert severity="success">Sign up successfully.</Alert>;
        }

        return null;
    };

    return (
        <>
            <div className="auth-container">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <SignUpEmail validateEmail={validateEmail}/>
                    <SignUpPassword validatePassword={validateSignUpPassword}/>
                    <SignUpConfirmPassword validateConfirmPassword={validateConfirmPassword}/>
                    <SignUpFirstName validateFirstName={validateFirstName}/>
                    <SignUpLastName validateLastName={validateLastName}/>
                    <SignUpPhoneNumber validatePhoneNumber={validatePhoneNumber}/>
                    <SignUpDateOfBirth validateDateOfBirth={validateDateOfBirth}/>

                    {signUpAlert()}

                    <LoadingButton
                        id="submit-button"
                        type="submit"
                        loading={isLoading}
                        loadingPosition="end"
                        endIcon={<AppRegistrationIcon/>}
                        disabled={!isFormValid}
                    >Sign Up</LoadingButton>
                </form>
            </div>
        </>
    );
};

