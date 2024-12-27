export function validateEmail(email: string): string {
    if (!email) return "Email is required";

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) return "Invalid email format";

    return "";
}

export function validateSignInPassword(password: string): string {
    if (!password) {
        return "Password is required";
    }

    return "";
}

export function validateSignUpPassword(password: string): string {
    if (!password) {
        return "Password is required";
    }

    if (password.length < 8 || password.length > 32) {
        return "Password must be between 8 and 32 characters";
    }

    return "";
}

export function validateConfirmPassword(password: string, confirmPassword: string): string {
    if (confirmPassword !== password) {
        return "Confirm password does not match";
    }

    return "";
}

export function validateFirstName(firstName: string): string {
    if (!firstName) {
        return "First name is required";
    }

    if (firstName.length > 255) {
        return "First name must be less than or equal to 255 characters";
    }

    return "";
}

export function validateLastName(lastName: string): string {
    if (!lastName) {
        return "Last name is required";
    }

    if (lastName.length > 255) {
        return "Last name must be less than or equal to 255 characters";
    }

    return "";
}

export function validatePhoneNumber(phoneNumber: string): string {
    if (!phoneNumber) return "";

    const regex = /^\+?[\d\s-]{7,15}$/;
    return (!regex.test(phoneNumber)) ? "Invalid phone number format" : "";
}

export function validateDateOfBirth(dateOfBirth: string): string {
    if (!dateOfBirth) return "";

    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    if (!dateRegex.test(dateOfBirth)) {
        return "Invalid date format (YYYY-MM-DD)";
    }

    const inputDate = new Date(dateOfBirth);
    const today = new Date();
    if (isNaN(inputDate.getTime())) return "Invalid date";
    if (inputDate >= today) return "Date of birth must be before today";

    return "";
}