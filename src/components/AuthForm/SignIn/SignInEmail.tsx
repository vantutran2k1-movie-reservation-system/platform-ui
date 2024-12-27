import "../AuthForm.css";
import React, {useState} from "react";
import {FormControl, FormHelperText, OutlinedInput} from "@mui/material";
import {useSignInFormContext} from "./SignInContext.tsx";

interface Props {
    validateEmail: (value: string) => string;
}

export default function SignInEmail(props: Props) {
    const {email, updateEmail} = useSignInFormContext();
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const error = props.validateEmail(value);
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