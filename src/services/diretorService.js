import database from '../repository/mysql.js'

async function createDirector (nomeDiretor, nacionalidade, dtNascimento,sexo) {
    const sql = "INSERT INTO tbl_usuario(nome_diretor, nacionalidade, dt_nascimento, sexo) VALUES(?,?,?,?)"

    const dataDirector = [nomeDiretor, nacionalidade, dtNascimento, sexo]

    const conn = await database.connect()
    await conn.query(sql, dataDirector)
    conn.end()
}

async function listDirector(){
    const sql = `SELECT * from tbl_diretor WHERE deletado = 0`;

    const conn = await database.connect();
    const[rows] = await conn.query(sql);
    conn.end();

    return rows;
}

async function updateDirector(id_diretor, nome_diretor, nacionalidade, dt_nascimento, sexo){
    const sql = `UPDATE tbl_diretor SET nome_diretor = ?, 
    nacionalidade = ?, dt_nascimento = ?, sexo = ? WHERE id_diretor = ?`;
    
    const dataDirector = [id_diretor, nome_diretor, nacionalidade, dt_nascimento, sexo];
    const conn = await database.connect();
    await conn.query(sql, dataDirector);
    conn.end();
}
async function deleteDirector(id_diretor){
    const sql = `UPDATE tbl_diretor set deletado = 1 WHERE id_ator = ?`;
    const conn = await database.connect();
    await conn.query(sql, id_diretor);
    conn.end();
}

async function validateDirector(nameDirector){
    const sql = "SELECT * FROM tbl_diretor WHERE nome_diretor = ?"

    const conn = await database.connect();
    await conn.query(sql, nameDirector);
    conn.end();
    return rows;
}


export default {createDirector, listDirector, updateDirector, deleteDirector, validateDirector};