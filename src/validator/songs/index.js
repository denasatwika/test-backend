import InvariantError from '../../exceptions/InvariantError.js';
import SongSchema from './schema.js';

const SongValidator = {
  validateSongPayload: (payload) => {
    const validationResult = SongSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(`Invalid song payload: ${validationResult.error.message}`);
    }
  },
};

export default SongValidator;
