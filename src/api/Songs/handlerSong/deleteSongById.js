import ClientError from '../../../exceptions/ClientError';

class DeleteSong {
  constructor(service) {
    this.service = service;

    this.deleteSongByIdHandler = this.deleteSongByIdHandler.bin(this);
  }

  async deleteSongsByIdHandler(request, h) {
    try {
      const { id } = request.params;

      await this.service.deleteSongById(id);

      return {
        status: 'success',
        message: 'Menghapus song berdasarkan id song',
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

export default DeleteSong;
