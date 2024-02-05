import { ILogin, IUser } from "@/redux/models";
import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080/api/proeduedge/",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    },
    });


export const login = async (user: ILogin) => {
    try {
        const response = await api.post("login", user);
        return response.data;
    } catch (error:any) {
        let errorMessage = 'An error occurred during login';
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        } else if (error.message) {
            errorMessage = error.message;
        }
        throw new Error(errorMessage);
    }
};

export const register = async (user: IUser) => {
    try {
        const response = await api.post("register", user);
        return response.data;
    } catch (error:any) {
        let errorMessage = 'An error occurred during registration';
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        } else if (error.message) {
            errorMessage = error.message;
        }
        throw new Error(errorMessage);
    }
}