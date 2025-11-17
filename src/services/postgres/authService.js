import { nanoid } from 'nanoid';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import InvariantError from '../../exceptions/InvariantError.js';
import NotFoundError from '../../exceptions/NotFoundError.js';
import { mapDbUserToModel } from '../../utils/mapDbToModel.js';
import AuthenticationError from '../../exceptions/AuthenticationError.js';

class UserService {
  constructor() {
    this.pool = new Pool();
  }

  async addUser({ username, password, fullname }) {
    await this.verifyNewUsername(username);
    const id = `user-${nanoid(16)}`;

    const hasHedPassword = await bcrypt.hash(password, 10);

    const query = {
      text: 'INSERT INTO users (id, username, password, fullname) VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, username, hasHedPassword, fullname],
    };

    const result = await this.pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('User gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async verifyNewUsername(username) {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this.pool.query(query);

    if (result.rowCount > 0) {
      throw new InvariantError('Gagal menambahkan user. Username sudah digunakan.');
    }
  }

  async getUserById(id) {
    const query = {
      text: 'SELECT id, username, fullname FROM users WHERE id = $1',
      values: [id],
    };

    const result = await this.pool.query(query);

    if (result.rowCount === 0) {
      throw new NotFoundError('User tidak ditemukan');
    }

    return result.rows.map(mapDbUserToModel)[0];
  }

  async addRefreshToken(token) {
    const query = {
      text: 'INSERT INTO authentications(token) VALUES($1)',
      values: [token],
    };

    await this.pool.query(query);
  }

  async verifyRefreshToken(token) {
    const query = {
      text: 'SELECT token FROM authentications WHERE token = $1',
      values: [token],
    };

    const result = await this.pool.query(query);

    if (result.rowCount === 0) {
      throw new InvariantError('Refresh token tidak valid');
    }
  }

  async verifyUserCredential(username, password) {
    const query = {
      text: 'SELECT id, password FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this.pool.query(query);

    if (result.rowCount === 0) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah');
    }

    const { id, password: hashedPassword } = result.rows[0];
    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah');
    }

    return id;
  }

  async deleteRefreshToken(token) {
    const query = {
      text: 'DELETE FROM authentications WHERE token = $1',
      values: [token],
    };

    await this.pool.query(query);
  }
}
export default UserService;
