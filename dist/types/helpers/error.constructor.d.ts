declare class BaseError extends Error {
    status: number;
    constructor(name: any, status: any, message: any);
}
export declare class ValidationError extends BaseError {
    constructor(message: any);
}
export {};
