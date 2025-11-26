import { PostPlayListPayloadSchema, PostSongToPlaylistPayloadSchema } from './schema.js';
import InvariantError from '../../exceptions/InvariantError.js';

const PlaylistValidator = {
  PostPlayListPayloadSchema: (payload) => {
    const validationResult = PostPlayListPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  PostSongtoPlaylistValidator: (payload) => {
    const validationResult = PostSongToPlaylistPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

export default PlaylistValidator;
