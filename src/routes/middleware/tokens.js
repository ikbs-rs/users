import express from "express";
const router = express.Router();

import { verifyToken, verifyJWT  } from '../../middleware/token.js';

router.post('/', verifyJWT) 
router.post('/verify', verifyToken);

export default router;

/****************************************************************** */
/*
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtConfig = require('./jwtConfig')

app.use(express.json())

router.post('/token', (req, res) => {
  const token = req.headers.authorization

  try {
    const decoded = jwt.verify(token, jwtConfig.secret)
    // ako token nije validan, dolazimo ovde
    // obradjujemo podatke koji su poslati sa end pointa
    res.status(200).json({ message: 'Podaci su uspesno obradjeni' })
  } catch (err) {
    res.status(401).json({ message: 'Niste autorizovani za ovaj zahtev' })
  }
})

router.post('/verify', async (req, res) => {
  // get token from request body
  const { token } = req.body;

  try {
      // verify token
      const payload = jwt.verify(token, jwtConfig.secret);

      // return payload and status 'valid'
      res.status(200).json({
          status: 'valid',
          payload
      });
  } catch (err) {
      // return status 'invalid'
      res.status(200).json({
          status: 'invalid'
      });
  }
});

module.exports = router;
*/
