import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ILogin, IUser, IUserState } from "../../models";
import { api } from "../../../api";
// User Thunk
export const loginUser = createAsyncThunk(
    "user/login",
    async (login: ILogin) => {
        try {
            const response = await api.post("login", login);
            console.log(response);
            return response.data;
        } catch (error:any) {
            return error.message;
        }
    }
);

export const registerUser = createAsyncThunk(
    "user/register",
    async (user: IUser) => {
        try {
            const response = await api.post("register", user);
            return response.data;
        } catch (error:any) {
            return error.message;
        }
    }
);



// User Slice
const initialState: IUserState = {
    user: {} as IUser,
    status: "idle",
    error: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
        state.user = action.payload;
        },
        logout: (state) => {
        state.user = {} as IUser;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state) => {
            state.status = "loading";
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.status = "idle";
            state.user = action.payload;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
        .addCase(registerUser.pending, (state) => {
            state.status = "loading";
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.status = "idle";
            state.user = action.payload;
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        });
    }
    });

export const { login, logout } = userSlice.actions;
export const selectUser = (state: any) => state.user.value;
export const getError = (state: any) => state.user.error;
export default userSlice.reducer;