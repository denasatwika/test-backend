import ClientError from '../../../exceptions/ClientError';

class GetAlbumById {
  constructor(service) {
    this.service = service;

    this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
  }

  async getAlbumByIdHandler(request, h) {
    try {
      const { id } = request.params;

      const album = await this.service.getAlbumById(id);

      return {
        status: 'success',
        data: {
          album,
        },
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

export default GetAlbumById;
