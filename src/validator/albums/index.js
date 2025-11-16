import InvariantError from '../../exceptions/InvariantError';
import AlbumSchema from './schema';

const AlbumValidator = {
  validateAlbumPayload: (payload) => {
    const validationResult = AlbumSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(`Invalid album payload: ${validationResult.error.message}`);
    }
  },
};

export default AlbumValidator;
