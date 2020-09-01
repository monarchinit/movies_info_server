class BaseError extends Error {
    status: number;
    constructor(name, status, message) {
        super(message);
        this.status = status;
        this.name = name;
    }
}

export class ValidationError extends BaseError {
    constructor(message) {
        super('ValidationError', 400, message);
    }
}
