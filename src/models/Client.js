import  bcrypt from "bcrypt";
import db from "../db/db.js";

const saltRounds = 10;
 
//create function
const create = async (client) => {
const [result] = await db.query("INSERT INTO client SET ?", client);
    return result;
  };

//find function
const find = async () => {
  const [rows] = await db.query("SELECT * FROM client");
  return rows;
};


//find by id function
const findByStext = async (stext) => {
  const [rows] = await db.query("SELECT * FROM client WHERE stext = ?", [stext]);
  return rows[0];
};

//find by id function
const findById = async (id) => {
  const [rows] = await db.query("SELECT * FROM client WHERE id = ?", [id]);
  return rows[0];
};

//update function
const update = async (id, client) => {
  const [result] = await db.query("UPDATE client SET ? WHERE id = ?", [
    client,
    id,
  ]);
  return result[0];
};

//delete function
const remove = async (id) => {
    try {
    const [result] = await db.query('DELETE FROM client WHERE id = ?', [id])
    return result;
    } catch (err) {
    throw new Error(err)
    }
    };

export default {
  find,
  findById,
  findByStext,
  create,
  update,
  remove,
};