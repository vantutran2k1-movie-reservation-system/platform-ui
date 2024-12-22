import {useNavigate} from "react-router-dom";
import {ROUTES} from "../constants/routes.ts";

const useAppNavigator = () => {
    const navigate = useNavigate();

    const goToHome = () => navigate(ROUTES.HOME);
    const goToLogin = () => navigate(ROUTES.AUTH);

    return {
        goToHome,
        goToLogin,
    };
};

export default useAppNavigator;