import "../AuthForm.css";
import React, {useState} from "react";
import {FormControl, FormHelperText, OutlinedInput} from "@mui/material";
import {useSignInFormContext} from "./SignInContext.tsx";

function validateEmail(email: string): string {
    if (!email) return "Email is required";

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) return "Invalid email format";

    return "";
}

export default function SignInEmail() {
    const {email, updateEmail} = useSignInFormContext();
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const error = validateEmail(value);
        setErrorMessage(error);
        updateEmail({value, isValid: !error, touched: true, errorMessage: error});
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
                />
                {errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
            </FormControl>
        </div>
    );
}