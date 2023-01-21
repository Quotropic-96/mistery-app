const router = require('express').Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
// missing User model

// GET signup view
// ROUTE /auth/signup
router.get('/signup', (req, res, next) => {
    res.render('auth/signup');
});

// POST signup form
// ROUTE /auth/signup
router.post('/signup', async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.render('auth/signup', { error: 'All fields are necessary' });
        return;
    }
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}/;
    if (!regex.test(password)) {
        res.render('auth/signup', { error: 'Password needs to contain at lesat 7 characters, one number, one lowercase an one uppercase letter.'});
        return;
    }
    try {
        const userInDB = await User.findOne({ username: username });
        if (userInDB) {
            res.render('auth/signup', { error: `There already is a user with username ${username}`});
            return;
        } else {
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(password, salt);
            const user =await User.create({ username, hashedPassword });
            res.render('user/profile', user);
        }
    } catch (error) {
        next(error);
    }
})

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