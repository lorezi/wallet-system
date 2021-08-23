import HttpException from '../utils/HttpException';


/**
 *@class NotFoundException
 * @description custom not found exception handler
 */
class NotFoundException extends HttpException {
    constructor(message: string) {
        super(404, message || 'Not found');
    }
}

export default NotFoundException;
