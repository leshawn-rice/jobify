const db = require("../db");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressErrors");

class Job {
  static async create(username, company, title, location, link) {
    const duplicate = await db.query(
      `SELECT * from jobs 
      WHERE username=$1 AND company=$2 AND title=$3 AND location=$4 AND link=$5`,
      [username, company, title, location, link]
    );

    if (duplicate.rows.length > 0) {
      throw new BadRequestError(`Duplicate job for user ${username}`);
    }

    const result = await db.query(
      `INSERT INTO jobs
      (username, company, title, location, link)
      VALUES
      ($1, $2, $3, $4, $5)
      RETURNING username, company, title, location, link`,
      [username, company, title, location, link]
    );

    const job = result.rows[0];

    return job;
  }
}