class GetSongById {
  constructor(service) {
    this.service = service;

    this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
  }

  async getSongByIdHandler(request) {
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
