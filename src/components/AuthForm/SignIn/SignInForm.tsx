import React, {useState} from "react";
import "../AuthForm.css";
import {Alert, Checkbox, FormControlLabel} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import LoginIcon from "@mui/icons-material/Login";
import useAppNavigator from "../../../hooks/UseAppNavigator.ts";
import {useSignInFormContext} from "./SignInContext.tsx";
import SignInEmail from "./SignInEmail.tsx";
import SignInPassword from "./SignInPassword.tsx";
import {signIn} from "../../../api/Auth.ts";
import {validateEmail} from "../AuthValidator.ts";

export default function SignInForm() {
    const {email, password, isFormValid} = useSignInFormContext();

    const [keepSignedIn, setKeepSignedIn] = useState<boolean>(false);
    const handleKeepSignedInChange = () => {
        setKeepSignedIn((prev) => !prev);
    };
    const keepSignedInButtonStyle = {
        "& .MuiFormControlLabel-label": {
            color: "#555",
            fontFamily: "\"Trirong\", serif",
        },
    };

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
    const {goToHome} = useAppNavigator();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsLoading(true);

        await signIn({email: email.value, password: password.value})
            .then((data) => {
                if (keepSignedIn) {
                    localStorage.setItem("authToken", JSON.stringify(data.data.token));
                } else {
                    sessionStorage.setItem("authToken", JSON.stringify(data.data.token));
                }

                setIsSuccess(true);

                goToHome();
            })
            .catch(() => {
                setIsSuccess(false);
            }).finally(() => {
                setIsLoading(false);
            });
    };

    const signInAlert = () => {
        if (isSuccess !== null && !isSuccess) {
            return <Alert severity="error">Invalid email or password. Please try again.</Alert>;
        }

        return null;
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <SignInEmail validateEmail={validateEmail}/>
                <SignInPassword/>

                <FormControlLabel sx={keepSignedInButtonStyle}
                                  label="Keep me signed in"
                                  control={<Checkbox checked={keepSignedIn} onChange={handleKeepSignedInChange}/>}
                />

                {signInAlert()}

                <LoadingButton
                    id="submit-button"
                    type="submit"
                    loading={isLoading}
                    loadingPosition="end"
                    endIcon={<LoginIcon/>}
                    disabled={!isFormValid}
                >Sign In</LoadingButton>

                <p className="forgot-password">
                    <a href="/reset-password">Forgot password?</a>
                </p>
            </form>
        </div>
    );
};

