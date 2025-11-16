import ClientError from '../../../exceptions/ClientError';

class EditAlbum {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;

    this.editAlbumByIdHandler = this.editAlbumByIdHandler.bind(this);
  }

  async editAlbumByIdHandler(request, h) {
    try {
      this.validator.validateAlbumPayload(request.payload);
      const { id } = request.params;
      const { name, year } = request.payload;

      await this.service.editAlbumById(id, { name, year });

      return {
        status: 'success',
        message: 'Mengubah album berdasarkan id album',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}

export default EditAlbum;
