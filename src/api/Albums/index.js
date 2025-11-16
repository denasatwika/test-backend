import PostAlbum from './handlerAlbum/postAlbum';
import GetAlbumById from './handlerAlbum/getAlbum';
import EditAlbum from './handlerAlbum/editAlbum';
import DeleteAlbum from './handlerAlbum/deleteAlbum';
import routes from './route';

export default {
  name: 'notes',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const postAlbum = new PostAlbum(service, validator);
    const getAlbum = new GetAlbumById(service);
    const editAlbum = new EditAlbum(service, validator);
    const deleteAlbum = new DeleteAlbum(service);
    server.route(routes(postAlbum, getAlbum, editAlbum, deleteAlbum));
  },
};
