class GetSong {
  constructor(service) {
    this.service = service;

    this.getSongsHandler = this.getSongsHandler.bind(this);
  }

  async getSongsHandler(request) {
    const { title, performer } = request.query;
    const songs = await this.service.getAllSongs({ title, performer });

    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }
}
export default GetSong;
