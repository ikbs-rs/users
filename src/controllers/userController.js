import jwt from "jsonwebtoken";
import jwtConfig from "../config/jwtConfig.js";
import userModel from "../models/User.js";
import blacklistTokenModel from "../models/Blacklist_token.js";
import bcrypt from "bcryptjs";

const saltRounds = 10

const register = async (req, res) => {
  try {
    //console.log(req.body)
    const user = await userModel.create(req.body);
    res.status(201).json({ message: "Korisnik uspesno kreiran", user });
  } catch (err) {
    res.status(500).json({ message: "Doslo je do greske", error: err.message });
  }
};

const login = async (req, res) => {
  try {
    //console.log(req.body);
    const user = await checkCredentials(req.body.username, req.body.password);
  
    const payload = {
      userId: user.id,
      username: user.username,
      iat: Date.now(),
    };
    
    const token = jwt.sign(payload, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });
    
    const refreshToken = jwt.sign(payload, jwtConfig.secret, {
      expiresIn: jwtConfig.refreshExpiresIn,
    });
    
    res.status(200).json({ token, refreshToken, userId: user.id, success: true });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    await blacklistTokenModel.create({ token });
    res.status(204).json({ message: "Korisnik uspesno odjavljen" });
  } catch (err) {
    res.status(500).json({ message: "Doslo je do greske", error: err.message });
  }
};

const getAll = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: "Doslo je do greske", error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Doslo je do greske", error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const user = await userModel.update(req.params.id, req.body);
    res.status(200).json({ message: "Korisnik uspesno izmenjen", user });
  } catch (err) {
    res.status(500).json({ message: "Doslo je do greske", error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const user = await userModel.remove(req.params.id);
    res.status(200).json({ message: "Korisnik uspesno obrisan", user });
  } catch (err) {
    res.status(500).json({ message: "Doslo je do greske", error: err.message });
  }
};

const checkCredentials = async (username, password) => {
  try {
    
    const user = await userModel.findByUsername(username);

    if (!user) {
      throw new Error("Korisnik nije pronađen");
    }
    //const match = await comparePasswords(password, user);
    //const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error("Pogrešna lozinka");
    }
    
    return user;
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Doslo je do greske", error: err.message });
  }
};

export default {
  register,
  login,
  logout,
  getAll,
  getById,
  update,
  remove,
};
