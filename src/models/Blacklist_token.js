import db from "../db/db.js";
import { uniqueId } from "../middleware/utility.js";

const uId = uniqueId
// Function to insert a new token into the blacklist
const insertToken = (token) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO blacklist_tokens (token) VALUES (?)',
      [token],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

// Function to check if a token exists in the blacklist
const findAll = (token) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM blacklist_tokens WHERE token = ?',
      [token],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

// Function to check if a token exists in the blacklist
const checkToken = (token) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM blacklist_tokens WHERE token = ?',
      [token],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

// Function to delete a token from the blacklist
const deleteToken = (token) => {
  return new Promise((resolve, reject) => {
    db.query(
      'DELETE FROM blacklist_tokens WHERE token = ?',
      [token],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

export default {
  insertToken,
  checkToken,
  deleteToken,
  findAll
};
