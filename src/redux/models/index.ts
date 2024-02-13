export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    avatarUrl: string;
}

export interface ILogin {
    email: string;
    password: string;
}

export interface IRegister {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
}

export interface IMediaResponse {
    status: string;
    error: boolean;
    blob: {
        uri: string;
        name: string;
        contentType: string;
        content: any;
    };
}