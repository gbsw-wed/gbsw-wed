const pool = require('../config/db');
const path = require('path');
const fs = require('fs');

const createUser = async (username, password, stuNum) => {
  const [result] = await pool.query(
    'INSERT INTO users (username, password, stuNum) VALUES (?, ?, ?)',
    [username, password, stuNum]
  );
  return result;
};

module.exports = {
  findByUsername: async (username) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE username=? AND deleted_at IS NULL', [username]);
    return rows[0];
  },

  findByStuNum: async (stuNum) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE stuNum=? AND deleted_at IS NULL', [stuNum]);
    return rows[0];
  },

  createUser,

  updateUsernameByStuNum: async (stuNum, username) => {
    const [result] = await pool.query('UPDATE users SET username=?, updated_at=NOW() WHERE stuNum=?', [username, stuNum]);
    return result.affectedRows;
  },

  updatePasswordByStuNum: async (stuNum, password) => {
    const [result] = await pool.query('UPDATE users SET password=?, updated_at=NOW() WHERE stuNum=?', [password, stuNum]);
    return result.affectedRows;
  },

  getUserProfileImage: async (userId) => {
    const [rows] = await pool.query('SELECT profile_img FROM users WHERE user_id=?', [userId]);
    return rows[0];
  },

  updateProfileImage: async (userId, fileName) => {
    const [result] = await pool.query('UPDATE users SET profile_img=?, updated_at=NOW() WHERE user_id=?', [fileName, userId]);
    return result.affectedRows;
  },

  softDeleteUser: async (userId) => {
    const [result] = await pool.query('UPDATE users SET deleted_at=NOW() WHERE user_id=?', [userId]);
    return result.affectedRows;
  }
};

