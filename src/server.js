import 'dotenv/config';

import Hapi from '@hapi/hapi';
import AlbumService from './services/postgres/albumService.js';
import SongService from './services/postgres/songService.js';
import ClientError from './exceptions/ClientError.js';
import AlbumValidator from './validator/albums/index.js';
import SongValidator from './validator/songs/index.js';
import Albums from './api/Albums/index.js';
import Songs from './api/Songs/index.js';

const init = async () => {
  const albumService = new AlbumService();
  const songService = new SongService();

  const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: Albums,
      options: {
        service: albumService,
        validator: AlbumValidator,
      },
    },
    {
      plugin: Songs,
      options: {
        service: songService,
        validator: SongValidator,
      },
    },
  ]);

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }

    return h.continue;
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
