export function validateEmail(email: string): string | null {
    if (!email) {
        return "Email is required";
    }

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) {
        return "Invalid email format";
    }

    return null;
}

export function validatePassword(password: string): string | null {
    if (!password) {
        return "Password is required";
    }

    if (password.length < 8 || password.length > 32) {
        return "Password must be between 8 and 32 characters";
    }

    return null;
}

export function validateConfirmedPassword(password: string, confirmedPassword: string): string | null {
    if (confirmedPassword !== password) {
        return "Confirmed password does not match";
    }

    return null;
}

export function validateFirstName(firstName: string): string | null {
    if (!firstName) {
        return "First name is required";
    }

    if (firstName.length > 255) {
        return "First name must be less than or equal to 255 characters";
    }

    return null;
}

export function validateLastName(lastName: string): string | null {
    if (!lastName) {
        return "Last name is required";
    }

    if (lastName.length > 255) {
        return "Last name must be less than or equal to 255 characters";
    }

    return null;
}

export function validatePhoneNumber(phoneNumber: string): string | null {
    if (phoneNumber) {
        const regex = /^\+?[\d\s-]{7,15}$/;
        if (!regex.test(phoneNumber)) {
            return "Invalid phone number format";
        }
    }

    return null;
}

export function validateDateOfBirth(dateOfBirth: string): string | null {
    if (!dateOfBirth) {
        return null;
    }

    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    if (!dateRegex.test(dateOfBirth)) {
        return "Invalid date format (YYYY-MM-DD)";
    }

    const inputDate = new Date(dateOfBirth);
    const today = new Date();
    if (isNaN(inputDate.getTime())) {
        return "Invalid date.";
    }
    if (inputDate >= today) {
        return "Date of birth must be before today.";
    }

    return null;
}