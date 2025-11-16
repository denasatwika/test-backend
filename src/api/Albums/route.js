const routes = (handler) => [
  {
    method: 'POST',
    path: '/albums',
    handler: handler.postAlbumHandler, // postNoteHandler hanya menerima dan menyimpan "satu" note.
  },
  {
    method: 'GET',
    path: '/albums/{id}',
    handler: handler.getAlbumByIdHandler, // getNoteByIdHandler mengembalikan "satu" note.
  },
  {
    method: 'PUT',
    path: '/albums/{id}',
    handler: handler.editAlbumByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/albums/{id}',
    handler: handler.deleteAlbumByIdHandler,
  },
];

export default routes;
