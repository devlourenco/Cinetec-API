import database from '../repository/mysql.js'

async function createGenero (genero) {
    const sql = "INSERT INTO tbl_genero(id_genero, genero) VALUES(?,?)"

    const conn = await database.connect();
    await conn.query(sql, genero);
    conn.end();
}

async function listGenero(){
    const sql = `SELECT * from tbl_genero WHERE deletado = 0`;

    const conn = await database.connect();
    const[rows] = await conn.query(sql);
    conn.end();

    return rows;
}
async function updateGenero(id_genero, genero){
    const sql = `UPDATE tbl_genero SET genero = ? WHERE id_genero = ?`;

    const dataGenero = [id_genero, genero];
    const conn = await database.connect();
    await conn.query(sql, dataGenero);
    conn.end();
}
async function deleteGenero(id_genero){
    const sql = `UPDATE tbl_genero SET deletado = 1 WHERE id_genero = ?`;
    const conn = await database.connect();
    await conn.query(sql,id_genero);
    conn.end();
}

async function validateGenero(genero){
    const sql = "SELECT * FROM tbl_genero WHERE genero = ?"

    const conn = await database.connect();
    const [rows] = await conn.query(sql, genero)
    conn.end();
    return rows;
} 


export default {createGenero, listGenero,updateGenero, deleteGenero, validateGenero};