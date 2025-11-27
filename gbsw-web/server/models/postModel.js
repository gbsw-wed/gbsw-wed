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

//  인기 검색어 조회수 합계 기준 
async function getPopularKeywords() {
    const sql = `
      SELECT 
        tag, 
        SUM(views) AS totalViews
      FROM posts 
      WHERE tag IS NOT NULL 
        AND tag != '' 
        AND deleted_at IS NULL
      GROUP BY tag
      ORDER BY totalViews DESC
      LIMIT 5
    `;
    const [rows] = await pool.query(sql);
    return rows; // [{ tag: "공지", totalViews: 2847 }, ...]
  }
  
  //  추천 검색어 좋아요 기준 
  async function getRecommendedKeywords() {
    const sql = `
      SELECT 
        tag, 
        SUM(likes) AS totalLikes
      FROM posts 
      WHERE tag IS NOT NULL 
        AND tag != '' 
        AND deleted_at IS NULL
      GROUP BY tag
      ORDER BY totalLikes DESC
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
    getPopularKeywords,
    getRecommendedKeywords
};
