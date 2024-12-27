import "../AuthForm.css";
import React, {useEffect, useState} from "react";
import {checkUserExistsByEmail} from "../../../api/Auth.ts";
import {CircularProgress, FormControl, FormHelperText, IconButton, InputAdornment, OutlinedInput} from "@mui/material";
import {useSignUpFormContext} from "./SignUpContext.tsx";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircle from "@mui/icons-material/CheckCircle";

interface Props {
    validateEmail: (value: string) => string;
}

export default function SignUpEmail(props: Props) {
    const {email, updateEmail} = useSignUpFormContext();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const error = props.validateEmail(value);
        setIsLoaded(false);
        updateEmailField(value, error, false);
    };

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [debouncedEmail, setDebouncedEmail] = useState<string>("");
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedEmail(email.value);
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
                const error = exist ? "This email is already in use." : "";
                updateEmailField(email.value, error, true);
            })
            .catch(() => {
            })
            .finally(() => {
                setIsLoading(false);
                setIsLoaded(true);
            });
    }, [debouncedEmail]);

    const checkUserExistsIcon = () => {
        if (!email.touched || (!isLoaded && !isLoading)) return null;
        if (isLoading) return <CircularProgress size="20px"/>;
        return errorMessage ? <ErrorIcon color="error"/> : <CheckCircle color="success"/>;
    };

    const updateEmailField = (value: string, errorMessage: string, isLoaded: boolean) => {
        setErrorMessage(errorMessage);
        updateEmail({value, isValid: isLoaded && !errorMessage, touched: true, errorMessage});
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