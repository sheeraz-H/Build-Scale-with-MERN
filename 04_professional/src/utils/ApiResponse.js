class ApiResponse {
    constructor(data, message = "Success", success = true, statusCode) {
        this.success = success;
        this.message = message;
        this.statusCode = statusCode;
        this.data = data || null;
    }
}

export { ApiResponse };
