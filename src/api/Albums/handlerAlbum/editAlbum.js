class EditAlbum {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;

    this.editAlbumByIdHandler = this.editAlbumByIdHandler.bind(this);
  }

  async editAlbumByIdHandler(request) {
    this.validator.validateAlbumPayload(request.payload);
    const { id } = request.params;
    const { name, year } = request.payload;

    await this.service.editAlbumById(id, { name, year });

    return {
      status: 'success',
      message: 'Mengubah album berdasarkan id album',
    };
  }
}

export default EditAlbum;
