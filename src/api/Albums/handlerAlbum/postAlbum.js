class PostAlbum {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;

    this.postAlbumHandler = this.postAlbumHandler.bind(this);
  }

  async postAlbumHandler(request, h) {
    this.validator.validateAlbumPayload(request.payload);
    const { name, year } = request.payload;

    const albumId = await this.service.addAlbum({ name, year });

    const response = h.response({
      status: 'success',
      message: 'Menambahkan album',
      data: {
        albumId,
      },
    });
    response.code(201);
    return response;
  }
}

export default PostAlbum;
