import "../AuthForm.css";
import React, {useState} from "react";
import {useSignUpFormContext} from "./SignUpContext.tsx";
import {FormControl, FormHelperText, OutlinedInput} from "@mui/material";

interface Props {
    validatePhoneNumber: (value: string) => string;
}

export default function SignUpPhoneNumber(props: Props) {
    const {phoneNumber, updatePhoneNumber} = useSignUpFormContext();
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const error = props.validatePhoneNumber(value);
        setErrorMessage(error);
        updatePhoneNumber({value, isValid: !error, touched: true, errorMessage: error});
    };

    return (
        <div className="form-group">
            <FormControl variant="outlined">
                <label htmlFor="phoneNumber">Phone Number</label>
                <OutlinedInput
                    id="phoneNumber"
                    name="phoneNumber"
                    value={phoneNumber.value}
                    onChange={handlePhoneNumberChange}
                    placeholder="Enter your phone number"
                    error={!!errorMessage}
                    className="input-field"
                />
                {!!errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
            </FormControl>
        </div>
    );
}