import database from '../repository/mysql.js'

async function createActor (nome_ator, sexo, dt_nascimento) {
    const sql = "INSERT INTO tbl_usuario(nome_ator, sexo, dt_nascimento) VALUES(?,?,?)"

    const dataActor = [nome_ator, sexo, dt_nascimento]

    const conn = await database.connect()
    await conn.query(sql, dataActor)
    conn.end()
}

async function listActor(){
    const sql = "SELECT * from tbl_ator WHERE deletado = 0";

    const conn = await database.connect();
    const[rows] = await conn.query(sql);
    conn.end();

    return rows;
}

async function updateActor(id_ator, nome_ator, sexo, dt_nascimento){
    const sql = `UPDATE tbl_ator SET nome_ator = ?,
    sexo = ?, dt_nascimento = ? WHERE id_ator = ?`;

    const dataActor = [id_ator, nome_ator, sexo, dt_nascimento];
    const conn = await database.connect();
    await conn.query(sql, dataActor);
    conn.end();
} 

async function deleteActor(id_ator){
    const sql = `DELETE tbl_ator set deletado = 1 WHERE id_ator = ?`;
    const conn = await database.connect();
    await conn.query(sql, id_ator);
    conn.end();
}


async function validateActor(nome_ator){
    const sql = "SELECT * FROM tbl_ator WHERE nome_ator = ?"
    const conn = await database.connect();
    await conn.query(sql, nome_ator);
    conn.end();
    
    return rows;
}

export default {createActor, listActor, updateActor, deleteActor, validateActor};