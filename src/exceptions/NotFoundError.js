import ClientError from './ClientError.js';

class NotFoundError extends ClientError {
  constructor(message) { // default statusCod sudah otomatis 400 dri warisan ClientError
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

export default NotFoundError;
