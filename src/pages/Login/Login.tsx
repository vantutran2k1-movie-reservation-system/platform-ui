import "./Login.css";

import SignUpForm from "../../components/AuthForm/SignUp/SignUpForm.tsx";
import {Button, ButtonGroup} from "@mui/material";
import {useState} from "react";
import SignInForm from "../../components/AuthForm/SignIn/SignInForm.tsx";
import {SignInProvider} from "../../components/AuthForm/SignIn/SignInContext.tsx";
import {SignUpProvider} from "../../components/AuthForm/SignUp/SignUpContext.tsx";

enum AuthMethod {
    SignUp,
    SignIn
}

export default function Login() {
    const baseButtonStyle = {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        fontFamily: "Trirong",
        fontSize: "16px",
        fontWeight: "bold",
    };
    const activeButtonStyle = {
        color: "#555",
        backgroundColor: "#ffffff",
        ...baseButtonStyle,
    };
    const disabledButtonStyle = {
        color: "#ffffff",
        ...baseButtonStyle,
    };

    const [authMethod, setAuthMethod] = useState<AuthMethod>(AuthMethod.SignIn);
    const switchAuthMethod = () => {
        setAuthMethod((prev) => {
            if (prev === AuthMethod.SignIn) return AuthMethod.SignUp;
            return AuthMethod.SignIn;
        });
    };

    const signInButtonStyle = authMethod === AuthMethod.SignIn ? activeButtonStyle : disabledButtonStyle;
    const signUpButtonStyle = authMethod === AuthMethod.SignUp ? activeButtonStyle : disabledButtonStyle;

    const displayForm = () => {
        if (authMethod === AuthMethod.SignIn) {
            return (
                <SignInProvider>
                    <SignInForm/>
                </SignInProvider>
            );
        }
        return (
            <SignUpProvider>
                <SignUpForm/>
            </SignUpProvider>
        );
    };

    return (
        <>
            <div className="button-container">
                <ButtonGroup
                    variant="text"
                    color="inherit"
                    aria-label="Auth button group"
                    className="button-group"
                    onClick={switchAuthMethod}
                    fullWidth
                >
                    <Button style={signInButtonStyle}>SIGN IN</Button>
                    <Button style={signUpButtonStyle}>SIGN UP</Button>
                </ButtonGroup>
            </div>

            <div>
                {displayForm()}
            </div>
        </>
    );
}