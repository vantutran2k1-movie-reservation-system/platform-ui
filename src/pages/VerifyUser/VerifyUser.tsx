import "./VerifyUser.css";
import VerifySignUp from "../../components/AuthForm/VerifySignUp/VerifySignUp.tsx";
import {Button, ButtonGroup} from "@mui/material";

export default function VerifyUser() {
    const buttonStyle = {
        color: "#555",
        backgroundColor: "#ffffff",
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        fontFamily: "Trirong",
        fontSize: "16px",
        fontWeight: "bold",
    };

    return (
        <>
            <div className="button-container">
                <ButtonGroup
                    variant="text"
                    color="inherit"
                    aria-label="Auth button group"
                    className="button-group"
                    disabled={true}
                    fullWidth
                >
                    <Button style={buttonStyle}>VERIFY USER</Button>
                </ButtonGroup>
            </div>
            <div>
                <VerifySignUp/>
            </div>
        </>
    );
}