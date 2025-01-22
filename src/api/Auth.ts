import apiClient from "./ApiClient.ts";

interface SignInData {
    email: string;
    password: string;
}

interface SignUpData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    dateOfBirth?: string;
}

export const signIn = async (data: SignInData) => {
    const response = await apiClient.post("/users/login", data);
    return response.data;
};

export const signUp = async (data: SignUpData) => {
    const payload = {
        email: data.email,
        password: data.password,
        profile: {
            first_name: data.firstName,
            last_name: data.lastName,
            ...(data.phoneNumber && {phone_number: data.phoneNumber}),
            ...(data.dateOfBirth && {date_of_birth: data.dateOfBirth}),
        },
    };

    const response = await apiClient.post("/users/", payload);
    return response.data;
};

export const checkUserExistsByEmail = async (email: string) => {
    const response = await apiClient.get(`/users/exists?email=${email}`);
    return response.data;
};

export const verifyUser = async (token: string) => {
    const response = await apiClient.post(`/users/verify`, undefined, {
        headers: {
            "Verification-Token": `${token}`,
        },
    });
    return response.data;
};