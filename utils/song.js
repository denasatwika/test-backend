const mapDbSongtoModel = ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  create_at,
  update_at,
  album_id,
}) => ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  createAt: create_at,
  updateAt: update_at,
  albumId: album_id,
});

export default mapDbSongtoModel;
