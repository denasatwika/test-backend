const routes = (handler) => [
  {
    method: 'POST',
    path: '/songs',
    handler: handler.postSongHandler, // postNoteHandler hanya menerima dan menyimpan "satu" note.
  },
  {
    method: 'GET',
    path: '/songs/',
    handler: handler.getSongsHandler, // getNoteByIdHandler mengembalikan "satu" note.
  },
  {
    method: 'GET',
    path: '/songs/{id}',
    handler: handler.getSongsByIdHandler, // getNoteByIdHandler mengembalikan "satu" note.
  },
  {
    method: 'PUT',
    path: '/songs/{id}',
    handler: handler.editSongByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/songs/{id}',
    handler: handler.deleteSongsByIdHandler,
  },
];

export default routes;
