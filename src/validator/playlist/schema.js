import Joi from 'joi';

export const PostPlayListPayloadSchema = Joi.object({
  name: Joi.string().required(),
});

export const PostSongToPlaylistPayloadSchema = Joi.object({
  songId: Joi.string().required(),
});
