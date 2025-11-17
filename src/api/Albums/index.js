import PostAlbum from './handlerAlbum/postAlbum.js';
import GetAlbumById from './handlerAlbum/getAlbum.js';
import EditAlbum from './handlerAlbum/editAlbum.js';
import DeleteAlbum from './handlerAlbum/deleteAlbum.js';
import routes from './route.js';

export default {
  name: 'albums',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const postAlbum = new PostAlbum(service, validator);
    const getAlbum = new GetAlbumById(service);
    const editAlbum = new EditAlbum(service, validator);
    const deleteAlbum = new DeleteAlbum(service);

    const albumsHandlers = {
      postAlbumHandler: postAlbum.postAlbumHandler,
      getAlbumByIdHandler: getAlbum.getAlbumByIdHandler,
      editAlbumByIdHandler: editAlbum.editAlbumByIdHandler,
      deleteAlbumByIdHandler: deleteAlbum.deleteAlbumByIdHandler,
    };

    server.route(routes(albumsHandlers));
  },

};
