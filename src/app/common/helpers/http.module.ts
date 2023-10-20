import axios, { AxiosError } from 'axios';
import { baseUrl } from '../constants/url.constants';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { redirect } from 'react-router';
import { message } from 'antd';

axios.defaults.baseURL = baseUrl;
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
    async (response) => response,
    ({ response, message: msg }: AxiosError) => {
        let errorMessage = '';
        if (msg === 'Network Error') {
            errorMessage = msg;
        }
        switch (response?.status) {
        case StatusCodes.INTERNAL_SERVER_ERROR:
            errorMessage = ReasonPhrases.INTERNAL_SERVER_ERROR;
            break;
        case StatusCodes.UNAUTHORIZED:
            errorMessage = ReasonPhrases.UNAUTHORIZED;
            // redirect(FRONTEND_ROUTES.ADMIN.LOGIN);
            redirect('/login');
            break;
        case StatusCodes.NOT_FOUND:
            errorMessage = ReasonPhrases.NOT_FOUND;
            break;
        case StatusCodes.BAD_REQUEST:
            errorMessage = ReasonPhrases.BAD_REQUEST;
            break;
        case StatusCodes.FORBIDDEN:
            errorMessage = ReasonPhrases.FORBIDDEN;
            break;
        default:
            break;
        }
        if (errorMessage !== '') {
            message.error(errorMessage);
        }

        return Promise.reject(msg);
    },
);

const httpModule = axios.create({
    baseURL: baseUrl,
});

export default httpModule;

// axios.interceptors.response.use(
//     async (response) => response,
//     ({ response, message }: AxiosError) => {
//         let errorMessage = '';
//         if (message === 'Network Error') {
//             errorMessage = message;
//         }
//         switch (response?.status) {
//         case StatusCodes.INTERNAL_SERVER_ERROR:
//             errorMessage = ReasonPhrases.INTERNAL_SERVER_ERROR;
//             break;
//         case StatusCodes.UNAUTHORIZED:
//             errorMessage = ReasonPhrases.UNAUTHORIZED;
//             window.location.href = '/login';
//             break;
//         default:
//             break;
//         }
//         console.log("here " + errorMessage);
//         return Promise.reject(message);
//     },
// );