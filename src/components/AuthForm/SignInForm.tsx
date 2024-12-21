import React, {useState} from "react";
import "./AuthForm.css";
import {FormControl, FormHelperText, IconButton, InputAdornment, OutlinedInput} from "@mui/material";
import {validateEmail, validatePassword} from "./AuthValidator.ts";
import {Visibility, VisibilityOff} from "@mui/icons-material";

export default function SignInForm() {
    const [email, setEmail] = useState<string>("");
    const [emailError, setEmailError] = useState<string | null>(null);
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        setEmailError(validateEmail(value));
    };
    const isEmailValid = email !== "" && emailError === null;

    const [password, setPassword] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        setPasswordError(validatePassword(value));
    };
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const isPasswordValid = password !== "" && passwordError === null;

    const canSubmit = isEmailValid && isPasswordValid;
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(email);
        console.log(password);
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Sign In</h2>

                <div className="form-group">
                    <FormControl variant="outlined">
                        <label htmlFor="email">Email <span className="required-field">*</span></label>
                        <OutlinedInput
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="Enter your email"
                            error={!!emailError}
                            className="input-field"
                        />
                        {!!emailError && <FormHelperText error>{emailError}</FormHelperText>}
                    </FormControl>
                </div>

                <div className="form-group">
                    <FormControl variant="outlined">
                        <label htmlFor="password">Password <span className="required-field">*</span></label>
                        <OutlinedInput
                            id="password"
                            name="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Enter your password"
                            error={!!passwordError}
                            className="input-field"
                            type={showPassword ? "text" : "password"}
                            endAdornment={
                                <InputAdornment position="end" className="toggle-password-btn">
                                    <IconButton
                                        aria-label={
                                            showPassword ? "hide the password" : "display the password"
                                        }
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        {!!passwordError && <FormHelperText error>{passwordError}</FormHelperText>}
                    </FormControl>
                </div>

                <button type="submit" className="submit-button" disabled={!canSubmit}>Sign In</button>

                <p className="forgot-password">
                    <a href="/reset-password">Forgot password?</a>
                </p>
            </form>
        </div>
    );
};

