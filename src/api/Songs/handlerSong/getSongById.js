import ClientError from '../../../exceptions/ClientError';

class GetSongById {
  constructor(service) {
    this.service = service;

    this.getSongsByIdHandler = this.getSongsByIdHandler.bind(this);
  }

  async getSongsByIdHandler(request, h) {
    try {
      const { id } = request.params;

      const song = await this.service.getSongById(id);

      return {
        status: 'success',
        data: {
          song,
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

export default GetSongById;
