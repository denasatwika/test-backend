import routes from './routes.js';
import UsersHandler from './handlerAuth/postUser.js';
import AuthenticationHandler from './handlerAuth/authHandler.js';

export default {
  name: 'Authentications',
  version: '1.0.0',
  register: async (server, { authService, TokenManager, validator }) => {
    const postUserHandler = new UsersHandler(authService, validator);
    const authenticationHandler = new AuthenticationHandler(authService, TokenManager, validator);

    const authHandler = {
      postUserHandler: postUserHandler.postUserHandler,
      postAuthHandler: authenticationHandler.postAuthHandler,
      editAuthHandler: authenticationHandler.editAuthHandler,
      deleteAuthHandler: authenticationHandler.deleteAuthHandler,
    };
    server.route(routes(authHandler));
  },

};
