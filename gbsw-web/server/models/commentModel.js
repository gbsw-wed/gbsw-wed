const pool = require('../config/db')




//댓글쓰기(댓글 저장)
async function createComment(userId,postId,content) {
    const sql = `insert into comments (user_id,post_id,content) values (?,?,?)`
    const [result] = await pool.query(sql,[userId,postId,content]);
    return result.insertId;
}



//특정 게시글에 달린 댓글 전체 조회
async function getCommentByPost(postId) {
    const sql = `select comments.* , users.username
                from comments
                join users on comments.user_id = users.user_id
                where post_id = ?
                order by comment_id ASC`

    const [rows] = await pool.query(sql,[postId])
    return rows[0].count;
}

// 댓글 삭제
async function deleteComment(commentId,userId) {
    const sql = `delete from comments where comment_id = ? and user_id = ?`
    await pool.query(sql, [commentId,userId])
}



// 댓글 개수 
async function getCommentCountByPost(postId) {
    const sql = 'SELECT COUNT(*) AS count FROM comments WHERE post_id = ?';
    const [rows] = await pool.query(sql, [postId]);
    return rows[0].count;  
}







module.exports = {createComment,getCommentByPost,deleteComment,getCommentCountByPost}








// create table comments (
//     comment_id int auto_increment primary key,
//     content varchar(255) not null,
//     level int not null default 0,
//     user_id int not null,
//     post_id int not null,
//     parent_comment_id int default null,
//     created_at datetime not null default now(),
//     updated_at datetime not null default now(),
//     deleted_at datetime,
//     foreign key (user_id) references users(user_id),
//     foreign key (post_id) references post(post_id),
//     foreign key (parent_comment_id) references comments(comment_id)
// );