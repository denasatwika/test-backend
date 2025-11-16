import ClientError from '../../../exceptions/ClientError';

class DeleteAlbum {
  constructor(service) {
    this.service = service;

    this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
  }

  async deleteAlbumByIdHandler(request, h) {
    try {
      const { id } = request.params;

      await this.service.deleteAlbumById(id);
      return {
        status: 'success',
        message: 'Menghapus album berdasarkan id album',
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

export default DeleteAlbum;
