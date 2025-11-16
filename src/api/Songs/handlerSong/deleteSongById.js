class DeleteSong {
  constructor(service) {
    this.service = service;

    this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
  }

  async deleteSongsByIdHandler(request) {
    const { id } = request.params;

    await this.service.deleteSongById(id);

    return {
      status: 'success',
      message: 'Menghapus song berdasarkan id song',
    };
  }
}

export default DeleteSong;
