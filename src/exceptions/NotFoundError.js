import ClientError from './ClientError';

class NotFoundError extends ClientError {
  constructor(message) { // default statusCod sudah otomatis 400 dri warisan ClientError
    super(message, 400);
    this.name = 'NotFoundError';
  }
}

export default NotFoundError;
