"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let success = false;
    let message = err.message || 'Something went wrong';
    let error = err;
    res.status(statusCode).json({
        success,
        message,
        error
    });
};
exports.default = globalErrorHandler;
