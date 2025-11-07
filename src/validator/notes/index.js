const { NotePayloadSchema } = require('./schema');

const NotesValidator = {
  validateNotePayload: (payload) => {
    const validationResult = NotePayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new Error(`Invalid note payload: ${validationResult.error.message}`);
    }
  },
};

module.exports = NotesValidator;
