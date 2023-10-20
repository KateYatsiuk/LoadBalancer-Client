export interface RegisterDto {
    userName: string;
    email: string;
    password: string;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface User {
    id: number;
    userName: string;
    email: string;
}