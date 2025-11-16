class GetSong {
  constructor(service) {
    this.service = service;

    this.getSongsHandler = this.getSongsHandler.bind(this);
  }

  async getSongsHandler() {
    const songs = await this.service.getAllSongs();

    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }
}
export default GetSong;
