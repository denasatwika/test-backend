const mapDbSongtoModel = ({
  id,
  name,
  year,
  create_at,
  update_at,
}) => ({
  id,
  name,
  year,
  createAt: create_at,
  updateAt: update_at,
});

export default mapDbSongtoModel;
