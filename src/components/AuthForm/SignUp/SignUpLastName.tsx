import "../AuthForm.css";
import React, {useState} from "react";
import {useSignUpFormContext} from "./SignUpContext.tsx";
import {FormControl, FormHelperText, OutlinedInput} from "@mui/material";

interface Props {
    validateLastName: (value: string) => string;
}

export default function SignUpLastName(props: Props) {
    const {lastName, updateLastName} = useSignUpFormContext();
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const error = props.validateLastName(value);
        setErrorMessage(error);
        updateLastName({value, isValid: !error, touched: true, errorMessage: error});
    };

    return (
        <div className="form-group">
            <FormControl variant="outlined">
                <label htmlFor="lastName">Last Name <span className="required-field">*</span></label>
                <OutlinedInput
                    id="lastName"
                    name="lastName"
                    value={lastName.value}
                    onChange={handleLastNameChange}
                    placeholder="Enter your last name"
                    error={!!errorMessage}
                    className="input-field"
                />
                {!!errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
            </FormControl>
        </div>
    );
}