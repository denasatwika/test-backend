class EditSong {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;

    this.editSongByIdHandler = this.editSongByIdHandler.bind(this);
  }

  async editSongByIdHandler(request) {
    this.validator.validateSongPayload(request.payload);
    const { id } = request.params;
    const {
      title, year, performer, genre, duration,
    } = request.payload;

    await this.service.editSongById(id, {
      title, year, performer, genre, duration,
    });

    return {
      status: 'success',
      message: 'Mengubah lagu berdasarkan id lagu',
    };
  }
}

export default EditSong;
