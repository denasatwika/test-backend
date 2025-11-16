import PostSong from './handlerSong/postSong';
import GetSong from './handlerSong/getSong';
import GetSongById from './handlerSong/getSongById';
import EditSong from './handlerSong/editSongById';
import DeleteSong from './handlerSong/deleteSongById';
import routes from './route';

export default {
  name: 'songs',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const postSong = new PostSong(service, validator);
    const getSong = new GetSong(service);
    const getSongById = new GetSongById(service);
    const editSong = new EditSong(service, validator);
    const deleteSong = new DeleteSong(service);
    server.route(routes(postSong, getSong, getSongById, editSong, deleteSong));
  },
};
