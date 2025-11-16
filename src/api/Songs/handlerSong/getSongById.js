class GetSongById {
  constructor(service) {
    this.service = service;

    this.getSongsByIdHandler = this.getSongsByIdHandler.bind(this);
  }

  async getSongsByIdHandler(request) {
    const { id } = request.params;

    const song = await this.service.getSongById(id);

    return {
      status: 'success',
      data: {
        song,
      },
    };
  }
}

export default GetSongById;
