import express from 'express'

import tokens from './middleware/tokens.js'
import blacklist_tokens from './models/blacklist_tokens.js'
import users from './models/users.js'

const router = express.Router();

router.use(express.json())

router.use('/adm/tokens', tokens)
router.use('/adm/blacklist_tokens', blacklist_tokens)
router.use('/adm/users', users)

router.all("/*", (req, res, next) => {
  return res.status(403).send({ error: "Forbidden!!" });
  next();
})

export default router;
