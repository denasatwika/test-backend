import Joi from 'joi';

export const PostPlayListPayloadSchema = Joi.object({
  name: Joi.string().required(),
});

export const PostPlayListIdPayloadSchema = Joi.object({
  refreshToken: Joi.string().required(),
});
