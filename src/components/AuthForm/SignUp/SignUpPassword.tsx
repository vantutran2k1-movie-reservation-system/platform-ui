import "../AuthForm.css";
import React, {useState} from "react";
import {useSignUpFormContext} from "./SignUpContext.tsx";
import {FormControl, FormHelperText, IconButton, InputAdornment, OutlinedInput} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

interface Props {
    validatePassword: (value: string) => string;
}

export default function SignUpPassword(props: Props) {
    const {password, updatePassword} = useSignUpFormContext();
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const error = props.validatePassword(value);
        setErrorMessage(error);
        updatePassword({value, isValid: !error, touched: true, errorMessage: error});
    };
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <div className="form-group">
            <FormControl variant="outlined">
                <label htmlFor="password">Password <span className="required-field">*</span></label>
                <OutlinedInput
                    id="password"
                    name="password"
                    value={password.value}
                    onChange={handlePasswordChange}
                    placeholder="Enter your password"
                    error={!!errorMessage}
                    className="input-field"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                        <InputAdornment position="end" className="toggle-password-btn">
                            <IconButton
                                aria-label={
                                    showPassword ? "hide the password" : "display the password"
                                }
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseEvent}
                                onMouseUp={handleMouseEvent}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                {!!errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
            </FormControl>
        </div>
    );
}