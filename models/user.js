const db = require("../db");
const bcrypt = require("bcrypt");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressErrors");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

// const Job = require('./job');

/** Related functions for users. */

class User {
  /** authenticate user with username, password.
   *
   * Returns { username }
   *
   * Throws UnauthorizedError is user not found or wrong password.
   **/

  static async authenticate(username, password) {
    // try to find the user first
    const result = await db.query(
      `SELECT username, password
           FROM users
           WHERE username = $1`,
      [username],
    );

    const user = result.rows[0];

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }

  /** Register user with data.
   *
   * Returns { username }
   *
   * Throws BadRequestError on duplicates.
   **/

  static async register({ username, password, confirm_password }) {
    const duplicateCheck = await db.query(
      `SELECT username
           FROM users
           WHERE username = $1`,
      [username],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }

    if (password !== confirm_password) {
      throw new BadRequestError('Passwords do not match!');
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `INSERT INTO users
           (username, password)
           VALUES ($1, $2)
           RETURNING username`,
      [username, hashedPassword]
    );

    const user = result.rows[0];

    return user;
  }

  /** Find all users.
   *
   * Returns [{ username }, ...]
   **/

  static async findAll() {
    const result = await db.query(
      `SELECT username
           FROM users
           ORDER BY username`,
    );

    return result.rows;
  }

  /** Given a username, return data about user.
   *
   * Returns { username, jobs }
   *   where jobs is { id, title, company_name, location, description }
   *
   * Throws NotFoundError if user not found.
   **/

  static async get(username) {
    const userRes = await db.query(
      `SELECT username
           FROM users
           WHERE username = $1`,
      [username],
    );

    const user = userRes.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    return user;
  }

  /** Delete given user from database; returns undefined. */

  static async remove(username) {
    let result = await db.query(
      `DELETE
           FROM users
           WHERE username = $1
           RETURNING username`,
      [username],
    );
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);
  }
}


module.exports = User;
