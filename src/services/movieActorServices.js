import database from '../repository/mysql.js';

async function createMovieActor(FK_id_ator, FK_id_filme){
    const sql = "INSERT INTO tbl_filme_ator(FK_id_ator, FK_id_filme) VALUES (?,?)"

    const dataMovieActor = [FK_id_ator, FK_id_filme];

    const conn = await database.connect();
    await conn.query(sql, dataMovieActor);
    conn.end();
};

async function listMovieActorGeneric(){
    const sql = "SELECT * from tbl_filme_ator";

    const conn = await database.connect();
    const[rows] = await conn.query(sql);
    conn.end();

    return rows;
};

async function listMovieActor(){
    const sql = "SELECT * from tbl_filme_ator  WHERE FK_id_ator = ? and FK_id_filme = ?";

    const conn = await database.connect();
    const[rows] = await conn.query(sql);
    conn.end();

    return rows;
};

async function deleteMovieActor(FK_id_ator, FK_id_filme){
    const sql = "DELETE tbl_filme_ator  WHERE FK_id_ator = ? and FK_id_filme = ?";
    const conn = await database.connect();
    await conn.query(sql, [FK_id_ator, FK_id_filme]);
    conn.end();
}


export default {createMovieActor, listMovieActorGeneric, listMovieActor, deleteMovieActor};