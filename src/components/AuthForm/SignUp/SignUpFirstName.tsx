import "../AuthForm.css";
import React, {useState} from "react";
import {useSignUpFormContext} from "./SignUpContext.tsx";
import {FormControl, FormHelperText, OutlinedInput} from "@mui/material";

interface Props {
    validateFirstName: (value: string) => string;
}

export default function SignUpFirstName(props: Props) {
    const {firstName, updateFirstName} = useSignUpFormContext();
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const error = props.validateFirstName(value);
        setErrorMessage(error);
        updateFirstName({value, isValid: !error, touched: true, errorMessage: error});
    };

    return (
        <div className="form-group">
            <FormControl variant="outlined">
                <label htmlFor="firstName">First Name <span className="required-field">*</span></label>
                <OutlinedInput
                    id="firstName"
                    name="firstName"
                    value={firstName.value}
                    onChange={handleFirstNameChange}
                    placeholder="Enter your first name"
                    error={!!errorMessage}
                    className="input-field"
                />
                {!!errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
            </FormControl>
        </div>
    );
}