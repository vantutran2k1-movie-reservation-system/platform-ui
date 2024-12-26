import "../AuthForm.css";
import React, {useEffect, useState} from "react";
import {checkUserExistsByEmail} from "../../../api/Auth.ts";
import {CircularProgress, FormControl, FormHelperText, IconButton, InputAdornment, OutlinedInput} from "@mui/material";
import {useSignUpFormContext} from "./SignUpContext.tsx";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircle from "@mui/icons-material/CheckCircle";

function validateEmail(email: string): string {
    if (!email) return "Email is required";

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) return "Invalid email format";

    return "";
}

export default function SignUpEmail() {
    const {email, updateEmail} = useSignUpFormContext();
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const error = validateEmail(value);
        updateEmailField(value, error);
    };

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDebouncing, setIsDebouncing] = useState<boolean>(false);
    const [debouncedEmail, setDebouncedEmail] = useState<string>("");
    useEffect(() => {
        setIsDebouncing(true);
        const handler = setTimeout(() => {
            setDebouncedEmail(email.value);
            setIsDebouncing(false);
        }, 500);
        return () => clearTimeout(handler);
    }, [email.value]);
    useEffect(() => {
        if (!debouncedEmail || errorMessage) {
            return;
        }

        setIsLoading(true);
        checkUserExistsByEmail(debouncedEmail)
            .then((data) => {
                const exist = data.data as boolean;
                if (exist) updateEmailField(email.value, "This email is already in use");
            })
            .catch(() => {
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [debouncedEmail]);

    const checkUserExistsIcon = () => {
        if (!email.touched || isDebouncing) return null;
        if (isLoading) return <CircularProgress size="20px"/>;
        return errorMessage ? <ErrorIcon color="error"/> : <CheckCircle color="success"/>;
    };

    const updateEmailField = (value: string, errorMessage: string) => {
        setErrorMessage(errorMessage);
        updateEmail({value, isValid: !isDebouncing && !errorMessage, touched: true, errorMessage});
    };

    return (
        <div className="form-group">
            <FormControl variant="outlined">
                <label htmlFor="email">Email <span className="required-field">*</span></label>
                <OutlinedInput
                    id="email"
                    name="email"
                    value={email.value}
                    onChange={handleEmailChange}
                    placeholder="Enter your email"
                    error={!!errorMessage}
                    className="input-field"
                    endAdornment={
                        <InputAdornment position="end" className="toggle-password-btn">
                            <IconButton
                                aria-label="is valid email"
                                edge="end"
                            >
                                {checkUserExistsIcon()}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                {!!errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
            </FormControl>
        </div>
    );
}