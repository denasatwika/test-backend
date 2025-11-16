import ClientError from '../../../exceptions/ClientError';

class EditSong {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;

    this.editSongByIdHandler = this.editSongByIdHandler.bind(this);
  }

  async editSongByIdHandler(request, h) {
    try {
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

export default EditSong;
