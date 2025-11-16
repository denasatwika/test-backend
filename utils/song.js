const mapDbSongtoModel = ({
  id,
  title,
  year,
  create_at,
  update_at,
}) => ({
  id,
  title,
  year,
  createAt: create_at,
  updateAt: update_at,
});

export default mapDbSongtoModel;
