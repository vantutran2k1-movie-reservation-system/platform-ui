import apiClient from "./ApiClient.ts";

interface SignInData {
    email: string;
    password: string;
}

export const signIn = async (data: SignInData) => {
    const response = await apiClient.post("/users/login", data);
    return response.data;
};