import Joi from 'joi';

export const UserSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  fullname: Joi.string().required(),
});

export const PostAuthenticationPayloadSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const PutAuthenticationPayloadSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

export const DeleteAuthenticationPayloadSchema = Joi.object({
  refreshToken: Joi.string().required(),
});
