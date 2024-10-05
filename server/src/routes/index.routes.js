const router = require("express").Router();
const bcrypt = require('bcrypt');


const { User } = require("../../db/models");


// --------------------

router.get('/check-session', (req, res) => {
  if (req.session.user_sid) {
    res.json({ user: req.session.user_sid });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

// --------------------

router.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await User.findOne({ where: { email } });
    const findUser = JSON.parse(JSON.stringify(data));

    const hasSamePassword = await bcrypt.compare(password, findUser.password);
    if (findUser && hasSamePassword) {
      req.session.user_sid = findUser;
      res.status(203).json({ user: findUser });
    } else {
      res.status(401).json({ message: "Incorrect email or password" });
    }
  } catch (error) {
    console.log(("ERROR WHILE LOGIN - ", error));
    res.status(503).json({ message: "SERVER ERROR" });
  }
});

router.post("/registration", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const findUser = await User.findOne({ where: { email } });
    if (!findUser) {
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      req.session.user_sid = findUser;
      res.status(201).json({ message: "User registered successfully!", user });
    } else {
      res.status(403).json({ message: "User already exists" });
    }
  } catch (error) {
    console.error("ERROR REGISTER: ", error);
    res.status(503).json({ message: "SERVER ERROR" });
  }
});

  router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Logout failed' });
      }
      res.status(200).json({ message: 'Logout successful' });
    });
  });
  
module.exports = router;
