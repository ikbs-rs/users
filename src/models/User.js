import  bcrypt from "bcryptjs";
import db from "../db/db.js";

const saltRounds = 10;
 
//create function
const create = async (user) => {
    // šifrujemo lozinku korisnika pre nego što se ona čuva u bazi podataka
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    // zamenjujemo lozinku korisnika sa šifrovanom verzijom
    user.password = hashedPassword;
 
    const [result] = await db.query("INSERT INTO users SET ?", user);
    return result;
  };

//find function
const find = async () => {
  const [rows] = await db.query("SELECT * FROM users");
  return rows;
};


//find by id function
const findByUsername = async (username) => {
  const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
  return rows[0];
};

//find by id function
const findById = async (id) => {
  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  return rows[0];
};

//update function
const update = async (id, user) => {
  const [result] = await db.query("UPDATE users SET ? WHERE id = ?", [
    user,
    id,
  ]);
  return result[0];
};

//delete function
const remove = async (id) => {
    try {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id])
    return result;
    } catch (err) {
    throw new Error(err)
    }
    };

export default {
  find,
  findById,
  findByUsername,
  create,
  update,
  remove,
};