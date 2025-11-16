import { nanoid } from 'nanoid';
import { Pool } from 'pg';
import mapDbSongtoModel from '../../../utils/song';
import InvariantError from '../../exceptions/InvariantError';
import NotFoundError from '../../exceptions/NotFoundError';

class SongService {
  constructor() {
    this.pool = new Pool();
  }

  async addSong({
    title, year, genre, performer, duration, albumId,
  }) {
    const id = nanoid(16);
    const createAt = new Date().toISOString();
    const updateAt = createAt;

    const query = {
      text: 'INSERT INTO songs (id, title, year, genre, performer, duration, "createAt", "updateAt", albumId) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
      values: [id, title, year, genre, performer, duration, createAt, updateAt, albumId],
    };

    const result = await this.pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Lagu gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getAllSongs() {
    const result = await this.pool.query('SELECT * FROM songs');

    return result.rows.map(mapDbSongtoModel);
  }

  async getSongById(id) {
    const query = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [id],
    };

    const result = await this.pool.query(query);

    if (result.rowCount === 0) {
      throw new NotFoundError('Lagu tidak ditemukan');
    }
    return result.rows.map(mapDbSongtoModel)[0];
  }

  async editSongById(id, {
    title, year, genre, performer, duration, albumId,
  }) {
    const updateAt = new Date().toISOString();

    const query = {
      text: 'UPDATE songs SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, "updateAt" = $6, albumId = $7 WHERE id = $8 RETURNING id',
      values: [title, year, genre, performer, duration, updateAt, albumId, id],
    };
    const result = await this.pool.query(query);

    if (result.rowCount === 0) {
      throw new NotFoundError('Gagal memperbarui lagu. Id tidak ditemukan');
    }
  }

  async deleteSongById(id) {
    const query = {
      text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this.pool.query(query);

    if (result.rowCount === 0) {
      throw new NotFoundError('Lagu gagal dihapus. Id tidak ditemukan');
    }
  }
}

export default SongService;
