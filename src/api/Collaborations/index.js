import CollaborationsHandler from './allHandler.js';
import routes from './routes.js';

export default {
  name: 'collaborations',
  version: '1.0.0',
  register: async (
    server,
    {
      collaborationsService, playlistsService, validator, userService,
    },
  ) => {
    const collaborationsHandler = new CollaborationsHandler(
      collaborationsService,
      playlistsService,
      validator,
      userService,
    );
    server.route(routes(collaborationsHandler));
  },
};
