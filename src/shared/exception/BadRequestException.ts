import HttpException from '../utils/HttpException';

/**
 *@class BadRequestException
 * @description custom bad request exception handler
 */
class BadRequestException extends HttpException {
    constructor(message: string) {
        super(400, message);
    }
}

export default BadRequestException;
