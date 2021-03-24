const dotenv = require('dotenv');
dotenv.config()

const SECRET_KEY = process.env.SECRET_KEY || "secret-key";
const PORT = +process.env.PORT || 3000;

// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  return (process.env.NODE_ENV === "test")
    ? "jobify_test"
    : process.env.DATABASE_URL || "jobify";
}

// Speed up bcrypt during tests, since the algorithm safety isn't being tested
//
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

module.exports = {
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
};