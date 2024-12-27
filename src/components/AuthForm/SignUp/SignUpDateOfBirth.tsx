import "../AuthForm.css";
import {useState} from "react";
import {useSignUpFormContext} from "./SignUpContext.tsx";
import {FormControl, FormHelperText} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Dayjs} from "dayjs";

interface Props {
    validateDateOfBirth: (value: string) => string;
}

export default function SignUpDateOfBirth(props: Props) {
    const {updateDateOfBirth} = useSignUpFormContext();
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleDateOfBirthChange = (value: Dayjs | null) => {
        if (!value) return;

        const formattedDate = value.format("YYYY-MM-DD");
        const error = props.validateDateOfBirth(formattedDate);
        setErrorMessage(error);
        updateDateOfBirth({value: formattedDate, isValid: !error, touched: true, errorMessage: error});
    };

    return (
        <div className="form-group">
            <FormControl variant="outlined">
                <label htmlFor="dateOfBirth">Date Of Birth</label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        slotProps={{
                            textField: {
                                sx: {
                                    border: "1px solid #ccc",
                                },
                            },
                        }}
                        className="input-field"
                        format="YYYY-MM-DD"
                        onChange={handleDateOfBirthChange}
                        disableFuture
                    />
                </LocalizationProvider>
                {!!errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
            </FormControl>
        </div>
    );
}