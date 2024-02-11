class ErrorHandler extends Error {
    constructor(message, statusCode=500) {
        super(message); 
        this.statusCode = statusCode
    }
}

export const errorMiddleware = (err,req,res,next) => {
    err.message = err.message || "Internal server error";
    err.statusCode = err.statusCode || 500;
    console.error(err);
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
}

export default ErrorHandler;