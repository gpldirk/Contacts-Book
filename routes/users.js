const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { check, validationResult } = require('express-validator/check')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


// @route   POST /api/users
// @desc    Register a user
// @access  Public
router.post('/', 
[
  check('name', 'Please use a name').not().isEmpty(),
  check('email', 'Please use a valid email').isEmail(),
  check('password', 'Please use password with 6 or more characters').isLength({ min: 6 })

], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    })

  } else {
    const {name, email, password} = req.body;

    try {
      let user = await User.findOne({email})
      if (user) {
        return res.status(400).json({
          msg: 'Email has been taken'
        })
      }

      user = new User({
        name, 
        email, 
        password
      })

      const salt = await bcrypt.genSalt(10) // generate random salt by returning Promise
      user.password = await bcrypt.hash(user.password, salt) // encrypt password using salt by returning Promise
      await user.save()

      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
        if (err) {
          throw (err)
        } else {

          res.json({
            token
          })
        }
      }) // token is valid for 1 hour

    } catch (err) {
      console.error(err.message)
      return res.status(500).send('server error')
    }
  }
})


module.exports = router;