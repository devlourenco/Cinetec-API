import database from '../repository/mysql.js'

async function verifyLogin(email, senha){
    const sql = "SELECT * FROM tbl_usuario WHERE deletado = 0 and email=? and senha=?";

    const dataLogin = [email, senha];

    const conn = await database.connect();
    const [rows] = await conn.query(sql, dataLogin);
    conn.end();

    return rows;
};
    

export default {verifyLogin};