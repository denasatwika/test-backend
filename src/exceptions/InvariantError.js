import ClientError from './ClientError';

class InvariantError extends ClientError {
  constructor(message) { // default statusCod sudah otomatis 400 dri warisan ClientError
    super(message);
    this.name = 'InvariantError';
  }
}

export default InvariantError;
