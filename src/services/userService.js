import database from '../repository/mysql.js'

async function createUser (email, senha, nome, tipoUsuario) {
    const sql = "INSERT INTO tbl_usuario(email, senha, nome, tipo_usuario) VALUES(?,?,?,?)"

    const dataUser = [email, senha, nome, tipoUsuario]

    const conn = await database.connect()
    await conn.query(sql, dataUser)
    conn.end()
}

async function listUser(){
    const sql = "select * from tbl_usuario WHERE deletado = 0";

    const conn = await database.connect();
    const [rows] = await conn.query(sql);
    conn.end();

    return rows;
}

async function updateUser(email, password, name,typeUser,idUser){
    const sql = `UPDATE tbl_usuario SET email = ?, 
    senha = ?, nome = ?, tipo_usuario = ? WHERE id_usuario = ?`;

    const dataUser = [email, password, name, typeUser, idUser];
    const conn = await database.connect();
    await conn.query(sql, dataUser);
    conn.end();
}

async function deleteUser(idUser){
    const sql = "UPDATE tbl_usuario set deletado = 1 WHERE id_usuario = ?";
    const conn = await database.connect();
    await conn.query(sql, idUser);
    conn.end();
}




export default {createUser, listUser, updateUser, deleteUser};