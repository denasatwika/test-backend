import 'dotenv/config';

import Hapi from '@hapi/hapi';
import AlbumService from './services/inMemory/albumService';
import SongService from './services/inMemory/songService';
import AlbumValidator from './validator/albums';
import SongValidator from './validator/songs';
import ClientError from './exceptions/ClientError';

const init = async () => {
  const albumService = new AlbumService();
  const songService = new SongService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: notes,
    options: {
      service: { albumService, songService },
      validator: { AlbumValidator, SongValidator },
    },
  });

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
