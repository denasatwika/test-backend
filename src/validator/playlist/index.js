import { PostPlayListPayloadSchema, PostPlayListIdPayloadSchema } from './schema.js';
import InvariantError from '../../exceptions/InvariantError.js';

const PlaylistValidator = {
  PostPlayListPayloadSchema: (payload) => {
    const validationResult = PostPlayListPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  PostPlayListIdPayloadSchema: (payload) => {
    const validationResult = PostPlayListIdPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

export default PlaylistValidator;
