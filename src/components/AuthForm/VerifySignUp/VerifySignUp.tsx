import "../AuthForm.css";

import {Alert, FormControl, OutlinedInput} from "@mui/material";
import React, {useState} from "react";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import {LoadingButton} from "@mui/lab";
import {verifyUser} from "../../../api/Auth.ts";

export default function VerifySignUp() {
    const [token, setToken] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
    const [errorMessage, setErrorMessage] = useState("");

    const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setToken(e.currentTarget.value);
    };

    const canSubmit = !isLoading && token.length > 0;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsLoading(true);
        setIsSuccess(null);
        await verifyUser(token)
            .then(() => setIsSuccess(true))
            .catch((error) => {
                setIsSuccess(false);

                if (error.status === 400) {
                    setErrorMessage("Invalid or expired token. Please try again.");
                } else {
                    setErrorMessage("An error occurred. Please try again.");
                }
            })
            .finally(() => setIsLoading(false));
    };

    const verifyAlert = () => {
        if (isSuccess !== null && !isSuccess) {
            return <Alert severity="error">{errorMessage}</Alert>;
        }

        if (isSuccess) {
            return <Alert severity="success">Verify user successfully.</Alert>;
        }

        return null;
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <FormControl variant="outlined">
                    <label htmlFor="email">Token <span className="required-field">*</span></label>
                    <OutlinedInput
                        id="token"
                        name="token"
                        value={token}
                        onChange={handleTokenChange}
                        placeholder="Enter your token"
                        className="input-field"
                    />
                </FormControl>

                {verifyAlert()}

                <LoadingButton
                    id="submit-button"
                    type="submit"
                    loading={isLoading}
                    loadingPosition="end"
                    endIcon={<FingerprintIcon/>}
                    disabled={!canSubmit}
                >Verify</LoadingButton>
            </form>
        </div>
    );
}