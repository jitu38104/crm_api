class ErrorHandler {
    constructor(status, msg) {
        this.status = status;
        this.msg = msg;
    }
    
    static internalServerError(msg = "Internal Server Error!") {
        return new ErrorHandler(500, msg);
    }

    static pageNotFoundError(msg = "404 Not Found!") {
        return new ErrorHandler(404, msg);
    }

    static authenticationError(msg = "Authentication Error!") {
        return new ErrorHandler(401, msg);
    }

    static duplicacyError(msg = "Duplicate Record Error!") {
        return new ErrorHandler(401, msg);
    }
}


module.exports = { ErrorHandler };
