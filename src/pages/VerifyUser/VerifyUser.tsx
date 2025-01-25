import "./VerifyUser.css";
import {Alert, FormControl, OutlinedInput} from "@mui/material";
import React, {useState} from "react";
import {verifyUser} from "../../api/Auth.ts";
import {LoadingButton} from "@mui/lab";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import Snackbar, {SnackbarCloseReason} from "@mui/material/Snackbar";

export default function VerifyUser() {
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

        setOpenSnackbar(true);
    };

    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const handleCloseSnackbar = (
        _event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenSnackbar(false);
    };
    const verifyResultSnackBar = () => {
        if (isSuccess === null) {
            return;
        }

        const alert = isSuccess ? (
            <Alert
                onClose={handleCloseSnackbar}
                severity="success"
                variant="filled"
                sx={{width: "100%"}}
            >
                Verify user successfully.
            </Alert>
        ) : (
            <Alert

                onClose={handleCloseSnackbar}
                severity="error"
                variant="filled"
                sx={{width: "100%"}}
            >
                {errorMessage}
            </Alert>
        );

        return (
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{vertical: "bottom", horizontal: "center"}}
            >
                {alert}
            </Snackbar>
        );
    };

    return (
        <>
            <div className="header">
                <h1>Verify User</h1>
                <p>Please enter the verification token sent to your email to verify your user</p>
            </div>
            <form className="verification-user-form" onSubmit={handleSubmit}>
                <FormControl variant="outlined">
                    <OutlinedInput
                        id="token"
                        name="token"
                        value={token}
                        onChange={handleTokenChange}
                        placeholder="Enter your token"
                        className="token-input-field"
                    />
                </FormControl>

                {verifyResultSnackBar()}

                <LoadingButton
                    id="submit-button"
                    type="submit"
                    loading={isLoading}
                    loadingPosition="end"
                    endIcon={<FingerprintIcon/>}
                    disabled={!canSubmit}
                >Verify</LoadingButton>
            </form>
        </>
    );
}