import Joi from 'joi';

const AlbumSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear())
    .required(),

});

export default AlbumSchema;
