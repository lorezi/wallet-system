import HttpException from '../utils/HttpException';


/**
 *@class NotFoundException
 * @description custom not found exception handler
 */
class UnAuthorizedException extends HttpException {
    constructor(message: string) {
        super(401, message);
    }
}

export default UnAuthorizedException;
