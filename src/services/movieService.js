import database from '../repository/mysql.js';

async function createMovie(nameMovie, release, duration, id_diretor, id_genero){

const sql = "INSERT INTO tbl_filme(nome_filme, ano_lancamento, duracao, FK_id_genero, FK_id_diretor) VALUES (?,?,?,?,?)"

const dataMovie = [nameMovie, release, duration, id_diretor, id_genero];

const conn = await database.connect();
await conn.query(sql, dataMovie);
conn.end();
}

async function listMovie(){
    const sql = "SELECT *from tbl_filme WHERE deletado = 0";

    const conn = await database.connect();
    const[rows] = await conn.query(sql);
    conn.end();

    return rows;
}


async function updateMovie(id_filme, nome_filme, ano_lancamento, duracao, id_diretor, id_genero ){
    const sql = `UPDATE tbl_filme SET nome_filme = ?, ano_lancamento = ?, duracao = ?, id_filme = ?`;

    const dataMovie = [id_filme, nome_filme, ano_lancamento, duracao, id_diretor, id_genero];
    const conn = await database.connect();
    await conn.query(sql, dataMovie);
    conn.end();
};

async function deleteMovie(id_filme){
    const sql = "DELETE tbl_filme set deletado = 1 WHERE id_filme = ?";
    const conn = await database.connect();
    await conn.query(sql, id_filme);
    conn.end();
}

async function validateMovie(nome_filme){
    const sql = "SELECT FROM tbl_filme WHERE nome_filme = ?";
    const conn = await database.connect();
    await conn.query(sql, nome_filme);
    conn.end();

    return rows;
}

export default {createMovie, listMovie, updateMovie, deleteMovie, validateMovie};