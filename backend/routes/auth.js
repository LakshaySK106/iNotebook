const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')
const JWT_SECRET = "thisisa$ecrettoken$tring";

router.post('/createuser',[
   body('name', 'Enter a valid name').isLength({ min: 3 }),
   body('email', 'Enter a valid email').isEmail(),
   body('password', 'Enter a valid password').isLength({ min: 5 })],
   async (req, res) => {
      let success = false;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({success, errors: errors.array() });
      }
      try {
         let user = await User.findOne({ email: req.body.email });
         if (user) {
            return res.status(400).json({success, error: "A user with this email is already exists!" });
         }

         const slt = await bcrypt.genSalt(10);
         const secP = await bcrypt.hash(req.body.password, slt);
         user = await User.create({
            name: req.body.name,
            password: secP,
            email: req.body.email
         });

         const data = {
            user: {
               id: user.id
            }
         }
         const theToken = jwt.sign(data, JWT_SECRET);
         success = true;
         res.json({ success, theToken })
      }
      catch (error) {
         console.error(error.message);
         res.status(500).send("Error has occured");
      }
   })

router.post('/login',
   body('email', 'Enter a valid email').isEmail(),
   body('password', 'Password cannot be empty').exists(),
   async (req, res) => {
      let success = false;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ success, errors: errors.array() });
      }
      const { email, password } = req.body
      try {
         let user = await User.findOne({ email });
         if (!user) {
            return res.status(400).json({ success, error: "Please try with correct login credential!" });
         }
         const pass = await bcrypt.compare(password, user.password);
         if (!pass) {
            return res.status(400).json({success, error: "Please try with correct login credential" });
         }

         const data = {
            user: {
               id: user.id
            }
         }
         const theToken = jwt.sign(data, JWT_SECRET);
         success = true;
         res.json({ success, theToken })
      }
      catch (error) {
         console.error(error.message);
         res.status(500).send("Error has occured");
      }
   })

router.post('/getuser', fetchuser, async (req, res) => {
   try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
   } catch (error) {
      console.error(error.message);
      res.status(500).send("Error has occured");
   }
})

module.exports = router