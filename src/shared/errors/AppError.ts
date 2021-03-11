class AppError {
    public readonly message: string;
    public readonly statusCode: number;

    constructor(message: string, statusCode?: number) {
        this.message = message;
        this.statusCode = statusCode ? statusCode : 400;
    }
}

export default AppError;
