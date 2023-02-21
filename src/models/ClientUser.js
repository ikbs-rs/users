import  bcrypt from "bcrypt";
import db from "../db/db.js";

const saltRounds = 10;
 
//create function
const create = async (clientuser) => {
const [result] = await db.query("INSERT INTO clientuser SET ?", clientuser);
    return result;
  };

//find function
const find = async () => {
  const [rows] = await db.query("SELECT * FROM clientuser");
  return rows;
};


//find by id function
const findByClientId = async (clientId) => {
  const [rows] = await db.query("SELECT * FROM clientuser WHERE clientid = ?", [clientId]);
  return rows[0];
};

//find by id function
const findById = async (id) => {
  const [rows] = await db.query("SELECT * FROM clientuser WHERE id = ?", [id]);
  return rows[0];
};

//update function
const update = async (id, clientuser) => {
  const [result] = await db.query("UPDATE clientuser SET ? WHERE id = ?", [
    clientuser,
    id,
  ]);
  return result[0];
};

//delete function
const remove = async (id) => {
    try {
    const [result] = await db.query('DELETE FROM clientuser WHERE id = ?', [id])
    return result;
    } catch (err) {
    throw new Error(err)
    }
    };

export default {
  find,
  findById,
  findByClientId,
  create,
  update,
  remove,
};