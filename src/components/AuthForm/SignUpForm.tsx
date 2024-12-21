import React, {useState} from "react";
import "./AuthForm.css";
import {
    validateConfirmedPassword,
    validateDateOfBirth,
    validateEmail,
    validateFirstName,
    validateLastName,
    validatePassword,
    validatePhoneNumber,
} from "./AuthValidator.ts";
import {FormControl, FormHelperText, IconButton, InputAdornment, OutlinedInput} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Dayjs} from "dayjs";

export default function SignUpForm() {
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

        setConfirmedPasswordError(validateConfirmedPassword(value, confirmedPassword));
    };
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const isPasswordValid = password !== "" && passwordError === null;

    const [confirmedPassword, setConfirmedPassword] = useState<string>("");
    const [confirmedPasswordError, setConfirmedPasswordError] = useState<string | null>(null);
    const [showConfirmedPassword, setShowConfirmedPassword] = useState<boolean>(false);
    const handleConfirmedPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setConfirmedPassword(value);
        setConfirmedPasswordError(validateConfirmedPassword(password, value));
    };
    const handleClickShowConfirmedPassword = () => setShowConfirmedPassword((show) => !show);
    const isConfirmedPasswordValid = confirmedPasswordError === null;

    const [firstName, setFirstName] = useState<string>("");
    const [firstNameError, setFirstNameError] = useState<string | null>(null);
    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFirstName(value);
        setFirstNameError(validateFirstName(value));
    };
    const isFirstNameValid = firstName !== "" && firstNameError === null;

    const [lastName, setLastName] = useState<string>("");
    const [lastNameError, setLastNameError] = useState<string | null>(null);
    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLastName(value);
        setLastNameError(validateLastName(value));
    };
    const isLastNameValid = lastName !== "" && lastNameError === null;

    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [phoneNumberError, setPhoneNumberError] = useState<string | null>(null);
    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPhoneNumber(value);
        setPhoneNumberError(validatePhoneNumber(value));
    };
    const isPhoneNumberValid = phoneNumberError === null;

    const [dateOfBirth, setDateOfBirth] = useState<string>("");
    const [dateOfBirthError, setDateOfBirthError] = useState<string | null>(null);
    const handleDateOfBirthChange = (value: Dayjs | null) => {
        if (value) {
            const formattedDate = value.format("YYYY-MM-DD");
            setDateOfBirth(formattedDate);
            setDateOfBirthError(validateDateOfBirth(formattedDate));
        }

    };
    const isDateOfBirthValid = dateOfBirthError === null;

    const canSubmit = isEmailValid && isPasswordValid && isConfirmedPasswordValid && isFirstNameValid && isLastNameValid && isPhoneNumberValid && isDateOfBirthValid;
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(email);
        console.log(password);
        console.log(confirmedPassword);
        console.log(firstName);
        console.log(lastName);
        console.log(phoneNumber);
        console.log(dateOfBirth);
    };

    return (
        <>
            <div className="auth-container">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <h2>Sign Up</h2>

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

                    <div className="form-group">
                        <FormControl variant="outlined">
                            <label htmlFor="password">Confirmed Password <span
                                className="required-field">*</span></label>
                            <OutlinedInput
                                id="confirmedPassword"
                                name="confirmedPassword"
                                value={confirmedPassword}
                                onChange={handleConfirmedPasswordChange}
                                placeholder="Enter your confirmed password"
                                error={!!confirmedPasswordError}
                                className="input-field"
                                type={showConfirmedPassword ? "text" : "password"}
                                endAdornment={
                                    <InputAdornment position="end" className="toggle-password-btn">
                                        <IconButton
                                            aria-label={
                                                showConfirmedPassword ? "hide the password" : "display the password"
                                            }
                                            onClick={handleClickShowConfirmedPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            onMouseUp={handleMouseUpPassword}
                                            edge="end"
                                        >
                                            {showConfirmedPassword ? <VisibilityOff/> : <Visibility/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            {!!confirmedPasswordError &&
								<FormHelperText error>{confirmedPasswordError}</FormHelperText>}
                        </FormControl>
                    </div>

                    <div className="form-group">
                        <FormControl variant="outlined">
                            <label htmlFor="firstName">First Name <span className="required-field">*</span></label>
                            <OutlinedInput
                                id="firstName"
                                name="firstName"
                                value={firstName}
                                onChange={handleFirstNameChange}
                                placeholder="Enter your first name"
                                error={!!firstNameError}
                                className="input-field"
                            />
                            {!!firstNameError && <FormHelperText error>{firstNameError}</FormHelperText>}
                        </FormControl>
                    </div>

                    <div className="form-group">
                        <FormControl variant="outlined">
                            <label htmlFor="lastName">Last Name <span className="required-field">*</span></label>
                            <OutlinedInput
                                id="lastName"
                                name="lastName"
                                value={lastName}
                                onChange={handleLastNameChange}
                                placeholder="Enter your last name"
                                error={!!lastNameError}
                                className="input-field"
                            />
                            {!!lastNameError && <FormHelperText error>{lastNameError}</FormHelperText>}
                        </FormControl>
                    </div>

                    <div className="form-group">
                        <FormControl variant="outlined">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <OutlinedInput
                                id="phoneNumber"
                                name="phoneNumber"
                                value={phoneNumber}
                                onChange={handlePhoneNumberChange}
                                placeholder="Enter your phone number"
                                error={!!phoneNumberError}
                                className="input-field"
                            />
                            {!!phoneNumberError && <FormHelperText error>{phoneNumberError}</FormHelperText>}
                        </FormControl>
                    </div>

                    <div className="form-group">
                        <FormControl variant="outlined">
                            <label htmlFor="dateOfBirth">Date Of Birth</label>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    format="YYYY-MM-DD"
                                    onChange={handleDateOfBirthChange}
                                    disableFuture
                                />
                            </LocalizationProvider>
                            {!!dateOfBirthError && <FormHelperText error>{dateOfBirthError}</FormHelperText>}
                        </FormControl>
                    </div>

                    <button type="submit" className="submit-button" disabled={!canSubmit}>Sign Up</button>
                </form>
            </div>
        </>
    );
};

