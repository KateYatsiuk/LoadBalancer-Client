import axios, { AxiosError } from 'axios';
import { baseUrl } from '../constants/url.constants';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { message } from 'antd';
import { FRONTEND_ROUTES } from '../constants/frontend-routes.constants';

axios.defaults.baseURL = baseUrl;
axios.defaults.withCredentials = true;

const httpModule = axios.create({
    baseURL: baseUrl,
});

httpModule.interceptors.response.use(
    async (response) => response,
    ({ response, message: msg }: AxiosError) => {
        console.log('Intercepting response');
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
            console.log("I AM UNAUTHORIZED");
            window.location.href = FRONTEND_ROUTES.LOGIN;
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

export default httpModule;
