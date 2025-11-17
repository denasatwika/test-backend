import InvariantError from '../../exceptions/InvariantError.js';
import AlbumSchema from './schema.js';

const AlbumValidator = {
  validateAlbumPayload: (payload) => {
    const validationResult = AlbumSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(`Invalid album payload: ${validationResult.error.message}`);
    }
  },
};

export default AlbumValidator;
