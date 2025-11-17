import PostSong from './handlerSong/postSong.js';
import GetSong from './handlerSong/getSong.js';
import GetSongById from './handlerSong/getSongById.js';
import EditSong from './handlerSong/editSongById.js';
import DeleteSong from './handlerSong/deleteSongById.js';
import routes from './route.js';

export default {
  name: 'songs',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const postSong = new PostSong(service, validator);
    const getSong = new GetSong(service);
    const getSongById = new GetSongById(service);
    const editSong = new EditSong(service, validator);
    const deleteSong = new DeleteSong(service);

    const songsHandlers = {
      postSongHandler: postSong.postSongHandler,
      getSongsHandler: getSong.getSongsHandler,
      getSongByIdHandler: getSongById.getSongByIdHandler,
      editSongByIdHandler: editSong.editSongByIdHandler,
      deleteSongByIdHandler: deleteSong.deleteSongByIdHandler,
    };

    server.route(routes(songsHandlers));
  },
};
