class GetAlbumById {
  constructor(service) {
    this.service = service;

    this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
  }

  async getAlbumByIdHandler(request) {
    const { id } = request.params;

    const album = await this.service.getAlbumById(id);

    return {
      status: 'success',
      data: {
        album,
      },
    };
  }
}

export default GetAlbumById;
