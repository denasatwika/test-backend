class PostSong {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;

    this.postSongHandler = this.postSongHandler.bind(this);
  }

  async postSongHandler(request) {
    this.validator.validateSongPayload(request.payload);
    const {
      title = 'untitled', year, genre, performer, duration, albumId,
    } = request.payload;

    const songId = await this.service.addSong({
      title, year, genre, performer, duration, albumId,
    });

    const response = response({
      status: 'success',
      message: 'Lagu berhasil ditambahkan',
      data: {
        songId,
      },
    });
    response.code(201);
    return response;
  }
}

export default PostSong;
