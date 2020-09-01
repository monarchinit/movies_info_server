"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
class BaseError extends Error {
    constructor(name, status, message) {
        super(message);
        this.status = status;
        this.name = name;
    }
}
class ValidationError extends BaseError {
    constructor(message) {
        super('ValidationError', 400, message);
    }
}
exports.ValidationError = ValidationError;
