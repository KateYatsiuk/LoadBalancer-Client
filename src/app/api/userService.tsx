import httpModule from '../common/helpers/http.module';
import { AUTH_ENDPOINTS } from '../common/constants/url.constants';
import { RegisterDto, LoginDto, User } from '../../models/AuthDTOs/auth-dtos';

export const register = async (registerDto: RegisterDto): Promise<void> => {
    try {
        await httpModule.post(AUTH_ENDPOINTS.REGISTER, registerDto);
    } catch (error) {
        throw new Error('Failed to register');
    }
};

export const login = async (loginDto: LoginDto): Promise<User> => {
    try {
        const response = await httpModule.post(AUTH_ENDPOINTS.LOGIN, loginDto);
        return response.data;
    } catch (error) {
        throw new Error('Failed to login');
    }
};

export const getUser = async (): Promise<User | null> => {
    try {
        const response = await httpModule.get(AUTH_ENDPOINTS.GET_USER);
        return response.data;
    } catch (error) {
        throw new Error('Failed to get the user');
    }
};

export const logout = async (): Promise<void> => {
    try {
        await httpModule.post(AUTH_ENDPOINTS.LOGOUT);
    } catch (error) {
        throw new Error('Failed to logout');
    }
};