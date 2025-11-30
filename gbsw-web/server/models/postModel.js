const pool = require('../config/db');

// 게시글 생성
async function createPost(userId, title, content, filePath = null, tag) {
    const sql = `
        INSERT INTO posts (user_id, title, content, file_path, tag)
        VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(sql, [userId, title, content, filePath, tag]);
    return result.insertId;
}

async function getPosts(keyword = '') {
    const k = `%${keyword}%`;
    const sql = `
        SELECT posts.*, users.username
        FROM posts
        JOIN users ON posts.user_id = users.user_id
        WHERE posts.title LIKE ?
        ORDER BY posts.created_at DESC
    `;
    const [rows] = await pool.query(sql, [k]);
    return rows;
}



// 게시글 상세
async function getPostById(postId) {
    await pool.query(`UPDATE posts SET views = views + 1 WHERE post_id = ?`, [postId]);

    const sql = `
        SELECT p.*, u.username
        FROM posts p
        JOIN users u ON p.user_id = u.user_id
        WHERE p.post_id = ? AND p.deleted_at IS NULL
    `;
    const [rows] = await pool.query(sql, [postId]);
    return rows[0];
}

// 좋아요
async function likePost(postId) {
    const sql = `UPDATE posts SET likes = likes + 1 WHERE post_id = ?`;
    await pool.query(sql, [postId]);
}

// 게시글 수정
async function updatePost(postId, title, content) {
    const sql = `UPDATE posts SET title = ?, content = ? WHERE post_id = ?`;
    const [result] = await pool.query(sql, [title, content, postId]);
    return result.affectedRows;
}

// 게시글 삭제
async function deletePost(postId) {
    const sql = `DELETE FROM posts WHERE post_id = ?`;
    const [result] = await pool.query(sql, [postId]);
    return result.affectedRows;
}

async function getPopularPosts() {
  const sql = `
    SELECT post_id, title, created_at
    FROM posts
    WHERE deleted_at IS NULL
    ORDER BY views DESC
    LIMIT 5
  `;
  const [rows] = await pool.query(sql);
  return rows;
}

async function getRecommendedPosts() {
  const sql = `
    SELECT post_id, title, created_at, likes
    FROM posts
    WHERE deleted_at IS NULL
    ORDER BY likes DESC, created_at DESC
    LIMIT 5
  `;
  const [rows] = await pool.query(sql);
  return rows;
}

module.exports = {
    createPost,
    getPosts,
    likePost,
    updatePost,
    deletePost,
    getPostById,
    getPopularPosts,
    getRecommendedPosts
};
