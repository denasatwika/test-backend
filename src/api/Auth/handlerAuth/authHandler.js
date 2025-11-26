class AuthenticationsHandler {
  constructor(authService, tokenManager, validator) {
    this.service = authService;
    this.tokenManager = tokenManager;
    this.validator = validator;

    this.postAuthHandler = this.postAuthHandler.bind(this);
    this.editAuthHandler = this.editAuthHandler.bind(this);
    this.deleteAuthHandler = this.deleteAuthHandler.bind(this);
  }

  async postAuthHandler(request, h) {
    this.validator.validatePostAuthenticationPayload(request.payload);
    const { username, password } = request.payload;

    const id = await this.service.verifyUserCredential(username, password);

    const accessToken = this.tokenManager.generateAccessToken({ id });
    const refreshToken = this.tokenManager.generateRefreshToken({ id });
    await this.service.addRefreshToken(refreshToken);

    const response = h.response({
      status: 'success',
      message: 'Authentication berhasil ditambahkan',
      data: {
        accessToken,
        refreshToken,
      },
    });
    response.code(201);
    return response;
  }

  async editAuthHandler(request) {
    this.validator.validatePutAuthenticationPayload(request.payload);
    const { refreshToken } = request.payload;

    await this.service.verifyRefreshToken(refreshToken);

    const { id } = this.tokenManager.verifyRefreshToken(refreshToken);

    const accessToken = this.tokenManager.generateAccessToken({ id });

    return {
      status: 'success',
      message: 'Access Token berhasil diperbarui',
      data: {
        accessToken,
      },
    };
  }

  async deleteAuthHandler(request) {
    this.validator.validateDeleteAuthenticationPayload(request.payload);
    const { refreshToken } = request.payload;

    await this.service.verifyRefreshToken(refreshToken);
    await this.service.deleteRefreshToken(refreshToken);

    return {
      status: 'success',
      message: 'Refresh token berhasil dihapus',
    };
  }
}

export default AuthenticationsHandler;
