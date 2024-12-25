import React, {createContext, useContext, useState} from "react";
import {FormFieldState} from "../types.ts";

interface SignInFormContextType {
    email: FormFieldState<string>;
    password: FormFieldState<string>;
    updateEmail: (state: FormFieldState<string>) => void;
    updatePassword: (state: FormFieldState<string>) => void;
    isFormValid: boolean;
}

const SignInContext = createContext<SignInFormContextType | undefined>(undefined);

export const useSignInFormContext = () => {
    const context = useContext(SignInContext);
    if (!context) {
        throw new Error("useSignInFormContext must be used within a SignInProvider");
    }
    return context;
};

export const SignInProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [email, setEmail] = useState<FormFieldState<string>>({value: "", isValid: false, touched: false});
    const [password, setPassword] = useState<FormFieldState<string>>({value: "", isValid: false, touched: false});

    const isFormValid = email.isValid && email.touched &&
        password.isValid && password.touched;
    return (
        <SignInContext.Provider
            value={{email, password, updateEmail: setEmail, updatePassword: setPassword, isFormValid}}>
            {children}
        </SignInContext.Provider>
    );
};
