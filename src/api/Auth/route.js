const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler, // postNoteHandler hanya menerima dan menyimpan "satu" note.
  },
  {
    method: 'POST',
    path: '/authentications',
    handler: handler.postAuthHandler,
  },
  {
    method: 'PUT',
    path: '/authentications',
    handler: handler.editAuthHandler,
  },
  {
    method: 'DELETE',
    path: '/authentications',
    handler: handler.deleteAuthHandler,
  },
];

export default routes;
