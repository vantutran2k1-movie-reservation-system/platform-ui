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