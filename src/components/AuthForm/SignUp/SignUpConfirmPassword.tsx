import "../AuthForm.css";
import React, {useState} from "react";
import {useSignUpFormContext} from "./SignUpContext.tsx";
import {FormControl, FormHelperText, IconButton, InputAdornment, OutlinedInput} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

interface Props {
    validateConfirmPassword: (password: string, confirmPassword: string) => string;
}

export default function SignUpConfirmPassword(props: Props) {
    const {password, confirmPassword, updateConfirmPassword} = useSignUpFormContext();
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const error = props.validateConfirmPassword(password.value, value);
        setErrorMessage(error);
        updateConfirmPassword({value, isValid: !error, touched: true, errorMessage: error});
    };
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
    const handleMouseEvent = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <div className="form-group">
            <FormControl variant="outlined">
                <label htmlFor="password">Confirm Password <span
                    className="required-field">*</span></label>
                <OutlinedInput
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword.value}
                    onChange={handleConfirmPasswordChange}
                    placeholder="Enter your confirm password"
                    error={!!errorMessage}
                    className="input-field"
                    type={showConfirmPassword ? "text" : "password"}
                    endAdornment={
                        <InputAdornment position="end" className="toggle-password-btn">
                            <IconButton
                                aria-label={
                                    showConfirmPassword ? "hide confirm password" : "display confirm password"
                                }
                                onClick={handleClickShowConfirmPassword}
                                onMouseDown={handleMouseEvent}
                                onMouseUp={handleMouseEvent}
                                edge="end"
                            >
                                {showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                {!!errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
            </FormControl>
        </div>
    );
}