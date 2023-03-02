export class StandardError {
    error_code?: string;
    message?: string;
    lastError?: {} | null;
    context?: {} | null;

    constructor(
        errorCode?: string,
        message?: string,
        lastError?: {} | null,
        context?: {} | null
    ){
        this.error_code = errorCode;
        this.message = message;
    }
}