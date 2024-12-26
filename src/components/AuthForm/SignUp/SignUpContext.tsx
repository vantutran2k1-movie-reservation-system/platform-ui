import React, {createContext, useContext, useState} from "react";
import {FormFieldState} from "../types.ts";

interface SignUpFormContextType {
    email: FormFieldState<string>;
    password: FormFieldState<string>;
    confirmPassword: FormFieldState<string>;
    firstName: FormFieldState<string>;
    lastName: FormFieldState<string>;
    phoneNumber: FormFieldState<string>;
    dateOfBirth: FormFieldState<string>;
    updateEmail: (state: FormFieldState<string>) => void;
    updatePassword: (state: FormFieldState<string>) => void;
    updateConfirmPassword: (state: FormFieldState<string>) => void;
    updateFirstName: (state: FormFieldState<string>) => void;
    updateLastName: (state: FormFieldState<string>) => void;
    updatePhoneNumber: (state: FormFieldState<string>) => void;
    updateDateOfBirth: (state: FormFieldState<string>) => void;
    isFormValid: boolean;
}

const SignUpContext = createContext<SignUpFormContextType | undefined>(undefined);

export const useSignUpFormContext = () => {
    const context = useContext(SignUpContext);
    if (!context) {
        throw new Error("useSignUpFormContext must be used within a SignUpProvider");
    }
    return context;
};

export const SignUpProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [email, setEmail] = useState<FormFieldState<string>>({value: "", isValid: false, touched: false});
    const [password, setPassword] = useState<FormFieldState<string>>({value: "", isValid: false, touched: false});
    const [confirmPassword, setConfirmPassword] = useState<FormFieldState<string>>({
        value: "",
        isValid: false,
        touched: false,
    });
    const [firstName, setFirstName] = useState<FormFieldState<string>>({value: "", isValid: false, touched: false});
    const [lastName, setLastName] = useState<FormFieldState<string>>({value: "", isValid: false, touched: false});
    const [phoneNumber, setPhoneNumber] = useState<FormFieldState<string>>({value: "", isValid: true, touched: false});
    const [dateOfBirth, setDateOfBirth] = useState<FormFieldState<string>>({value: "", isValid: true, touched: false});

    const isFormValid = email.isValid && email.touched &&
        password.isValid && password.touched &&
        confirmPassword.isValid && confirmPassword.touched &&
        firstName.isValid && firstName.touched &&
        lastName.isValid && lastName.touched &&
        phoneNumber.isValid &&
        dateOfBirth.isValid;
    return (
        <SignUpContext.Provider
            value={{
                email,
                password,
                confirmPassword,
                firstName,
                lastName,
                phoneNumber,
                dateOfBirth,
                updateEmail: setEmail,
                updatePassword: setPassword,
                updateConfirmPassword: setConfirmPassword,
                updateFirstName: setFirstName,
                updateLastName: setLastName,
                updatePhoneNumber: setPhoneNumber,
                updateDateOfBirth: setDateOfBirth,
                isFormValid,
            }}>
            {children}
        </SignUpContext.Provider>
    );
};
