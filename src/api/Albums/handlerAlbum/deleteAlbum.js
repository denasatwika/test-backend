class DeleteAlbum {
  constructor(service) {
    this.service = service;

    this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this);
  }

  async deleteAlbumByIdHandler(request) {
    const { id } = request.params;

    await this.service.deleteAlbumById(id);
    return {
      status: 'success',
      message: 'Menghapus album berdasarkan id album',
    };
  }
}

export default DeleteAlbum;
