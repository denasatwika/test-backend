import { nanoid } from 'nanoid';
import { Pool } from 'pg';
import mapDbAlbumtoModel from '../../../utils/album';
import InvariantError from '../../exceptions/InvariantError';
import NotFoundError from '../../exceptions/NotFoundError';

class AlbumService {
  constructor() {
    this.pool = new Pool();
  }

  async addAlbum({ name, year }) {
    const id = nanoid(16);
    const createAt = new Date().toISOString();
    const updateAt = createAt;

    const query = {
      text: 'INSERT INTO albums (id, name, year, "createAt", "updateAt") VALUES($1, $2, $3, $4, $5) RETURNING id',
      values: [id, name, year, createAt, updateAt],
    };

    const result = await this.pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Album gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getAlbumById(id) {
    const query = {
      text: 'SELECT * FROM albums WHERE id = $1',
      values: [id],
    };

    const result = await this.pool.query(query);

    if (result.rowCount === 0) {
      throw new NotFoundError('Album tidak ditemukan');
    }
    return result.rows.map(mapDbAlbumtoModel)[0];
  }

  async editAlbumById(id, { name, year }) {
    const updateAt = new Date().toISOString();

    const query = {
      text: 'UPDATE albums SET name = $1, year = $2, "updateAt" = $3 WHERE id = $4 RETURNING id',
      values: [name, year, updateAt, id],
    };
    const result = await this.pool.query(query);

    if (result.rowCount === 0) {
      throw new NotFoundError('Gagal memperbarui album. Id tidak ditemukan');
    }
  }

  async deleteAlbumById(id) {
    const query = {
      text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this.pool.query(query);

    if (result.rowCount === 0) {
      throw new NotFoundError('Album gagal dihapus. Id tidak ditemukan');
    }
  }
}

export default AlbumService;
