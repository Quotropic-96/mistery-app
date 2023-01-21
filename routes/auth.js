const router = require("express").Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/User');

/* GET log in view. */
router.get('/login', (req, res, next) => {
  res.render('auth/login');
});

/* POST log in view. */
router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.render('auth/login', { error: 'Introduce username and password to log in' });
    return;
  }
  try {
    const userInDB = await User.findOne({username: username});
    if (!userInDB) {
      res.render('auth/login', { error: `There are no users by ${username}` });
      return;
    } else {
      const passwordMatch = await bcrypt.compare(password, userInDB.hashedPassword);
      if (passwordMatch) {
        req.session.currentUser = userInDB;
        res.render('user/profile', {userInDB});
      } else {
        res.render('auth/login',  { error: 'Unable to authenticate user' });
        return;
      }
    }
  } catch (error) {
    next(error)
  }
});

module.exports = router;