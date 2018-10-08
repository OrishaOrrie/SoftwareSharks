import { HTTP_STATUS_CODES } from './http-codes';

export interface ErrorResponse {
    code: HTTP_STATUS_CODES;
    acknowledgement: string;
    data?: string;
}
