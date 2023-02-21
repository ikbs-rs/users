const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');

export default (req, res, next) => {
const authHeader = req.headers.authorization;
if(!authHeader) return res.status(401).send({ error: 'No token provided' });

const parts = authHeader.split(' ');
if(!parts.length === 2) return res.status(401).send({ error: 'Token error' });

const [ scheme, token ] = parts;

if(!/^Bearer$/i.test(scheme)) return res.status(401).send({ error: 'Token malformed' });

jwt.verify(token, jwtConfig.secret, (err, decoded) => {
    if(err) return res.status(401).send({ error: 'Token invalid' });
    req.userId = decoded.id;
    next();
});
}

/*
********************************* dodavanje dodatnih informacija u payload !!!!! IMPLEMENTIRAO
const payload = {
    userId: user._id,
    username: user.username,
    email: user.email,
    iat: Date.now()
};

const token = jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
const refreshToken = jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.refreshExpiresIn });
********   !!!!!! 
jwt.verify(refreshToken, jwtConfig.secret, (err, decoded) => {
  if(err) return res.status(401).send({ error: 'Refresh token is expired' });
  // u suprotnom, generiši novi token
});


************************************  postavljanje na blek listu 
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtConfig');
const blacklistedTokens = new Set(); // cache za "blacklisted" token-e

const checkToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).send({ error: 'No token provided' });

    if (blacklistedTokens.has(token)) return res.status(401).send({ error: 'Token has been blacklisted' });

    try {
        jwt.verify(token, jwtConfig.secret);
        next();
    } catch (err) {
        return res.status(401).send({ error: 'Invalid token' });
    }
}

const logout = (req, res) => {
    const token = req.headers.authorization;
    blacklistedTokens.add(token); // dodaj token u "blacklist"
    res.send({ message: 'Successfully logged out' });
}

module.exports = { checkToken, logout };

************************************  blek lista sa bazom ko logout procedura  !!!!!!!
//logout function
const logout = async (token) => {
  await db.query("INSERT INTO blacklist (token) VALUES (?)", [token]);
}

//check if token is blacklisted function
const isBlacklisted = async (token) => {
  const [rows] = await db.query("SELECT * FROM blacklist WHERE token = ?", [token]);
  return rows.length > 0;
}

************************************* implementacija vracanja payloud !!!!!!!!
const jwt = require('jsonwebtoken');
const jwtSecret = 'your_secret_key';

app.post('/verify', (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to authenticate token.' });
        }
        res.status(200).json({ payload: decoded });
    });
});
*********
const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwtConfig");

const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        return res.status(401).json({
            message: "Token nije prosleđen",
        });
    }

    jwt.verify(token, jwtConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Token nije validan",
            });
        }

        req.decoded = decoded;
        next();
    });
};

module.exports = verifyToken;

*************************************
*/
